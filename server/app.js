process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const yapi = require('./yapi.js');
const commons = require('./utils/commons');
yapi.commons = commons;
const dbModule = require('./utils/db.js');
yapi.connect = dbModule.connect();
const mockServer = require('./middleware/mockServer.js');
const proxyServer = require('./middleware/proxyServer.js');
require('./plugin.js');
const websockify = require('koa-websocket');
const websocket = require('./websocket.js');
const storageCreator = require('./utils/storage')
require('./utils/notice')

const Koa = require('koa');
const koaStatic = require('koa-static');
// const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const router = require('./router.js');

const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const delay = require('@zcorky/delay').delay;
const { v4: uuid } = require('uuid');
const moment = require('@zcorky/moment').moment;
const lodash = require('lodash');
const qs = require('querystring');

const userModel = require('./models/user.js');

// const withOauth = require('./controllers/oauth');

global.storageCreator = storageCreator;
let indexFile = process.argv[2] === 'dev' ? 'dev.html' : 'index.html';

const app = websockify(new Koa());
app.proxy = true;
yapi.app = app;

// app.use(bodyParser({multipart: true}));
app.use(koaBody({
  multipart: true,
  jsonLimit: '2mb',
  ormLimit: '1mb',
  textLimit: '1mb',
}));
app.use(mockServer);

async function checkAuthorize(ctx) {
  let token = ctx.cookies.get('_yapi_token');
  let uid = ctx.cookies.get('_yapi_uid');
  try {
    if (!token || !uid) {
      return false;
    }
    let userInst = yapi.getInst(userModel); //创建user实体
    let result = await userInst.findById(uid);
    if (!result) {
      return false;
    }

    let decoded;
    try {
      decoded = jwt.verify(token, result.passsalt);
    } catch (err) {
      return false;
    }

    if (decoded.uid == uid) {
      this.$uid = uid;
      this.$auth = true;
      this.$user = result;
      return true;
    }

    return false;
  } catch (e) {
    yapi.commons.log(e, 'error');
    return false;
  }
}

async function loginOrCreate(ctx, email, username, role) {
  //登录
  console.log('loginOrCreate: ', email, username, role);
  let userInst = yapi.getInst(userModel); //创建user实体

  if (!email) {
    return (ctx.body = yapi.commons.resReturn(null, 400, 'email不能为空'));
  }

  let result = await userInst.findByEmail(email);

  if (!result) {
    // create
    let passsalt = yapi.commons.randStr();
    let password = yapi.commons.randStr();
    let data = {
      username: username,
      password: yapi.commons.generatePassword(password, passsalt), //加密
      email,
      passsalt: passsalt,
      role: role === 'admin' ? 'admin' : yapi.WEBCONFIG.adminAccount === email ? 'admin' : 'member',
      add_time: yapi.commons.time(),
      up_time: yapi.commons.time(),
      type: 'site',
    };

    let user = await userInst.save(data);

    // user doesnot exist
    console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} [user][new] login success`);
    await setLoginCookie(ctx, user._id, user.passsalt, email);
  } else {
    // update admin by email
    if (yapi.WEBCONFIG.adminAccount === email && result.role !== 'admin') {
      console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} [user][admin] update admin on email: ${email}`);
      result.role = 'admin';
      await result.save();
    }

    if (role === 'admin') {
      console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} [user][admin] update admin on role: ${email}`);
      result.role = 'admin';
      await result.save();
    }

    if (username !== result.username) {
      console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} [user][update] update username: ${result.username} => ${username}`);
      result.username = username;
      await result.save();
    }

    if (role !== result.role) {
      console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} [user][role] update role: ${result.role} => ${role}`);
      result.role = role;
      await result.save();
    }

    // user exits
    console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} [user][exist] login success`);
    await setLoginCookie(ctx, result._id, result.passsalt, email);
  }
}

async function setLoginCookie(ctx, uid, passsalt, email) {
  let token = jwt.sign({ uid: uid }, passsalt, { expiresIn: '7 days' });

  ctx.cookies.set('_yapi_token', token, {
    expires: yapi.commons.expireDate(7),
    httpOnly: true
  });

  ctx.cookies.set('_yapi_uid', uid, {
    expires: yapi.commons.expireDate(7),
    httpOnly: true
  });

  ctx.cookies.set('_yapi_email', email, {
    expires: yapi.commons.expireDate(7),
    httpOnly: true
  });
}

function getPrefix(ctx) {
  if (yapi.WEBCONFIG.root_url) {
    return yapi.WEBCONFIG.root_url;
  }

  const protocol = process.env.SITE_PROTOCOL || ctx.protocol;
  const host = process.env.SITE_HOST || ctx.host;

  return `${protocol}://${host}`;
}

async function ssoOnlySolution(ctx) {
  // ticket && path === login && method === post => login or register
  const type = ctx.request.query.type;
  const path = ctx.path;
  const method = ctx.method;

  const target = encodeURIComponent(`${getPrefix(ctx)}/login/sso/callback`);

  const token = ctx.request.query[yapi.WEBCONFIG.sso.token_key];
  const SSO_AUTH_SERVER_URL = yapi.WEBCONFIG.sso.server_url + target;
  const SSO_AUTH_USER_URL = yapi.WEBCONFIG.sso.user_url + token;

  // console.log('x: ', type, ticket, path, method, ctx.query, ctx.request.query);
  if (token && path === '/login/sso/callback' && method === 'GET') {
    // get sso user
    const res = await fetch(SSO_AUTH_USER_URL, {
      timeout: 10000, // 10s
    });

    if (res.status !== 200) {
      console.log('sso get user failed.');
      await delay(3000);
      await ctx.redirect(SSO_AUTH_SERVER_URL);

      return;
    }

    const user = await res.json();
    console.log('sso user: ', user);

    // 
    if (user.result === false) {
      console.log('sso get user failed by result.');

      // ticket invalid
      // @TODO
      //   sso only => go sso login
      //   sso => go self login
      await ctx.redirect(SSO_AUTH_SERVER_URL);

      return;
    }

    const email = lodash.get(user, yapi.WEBCONFIG.user.emailKey);
    const username = lodash.get(user, yapi.WEBCONFIG.user.usernameKey);

    // check user => login or sso
    await loginOrCreate(ctx, email, username);
    await ctx.redirect(`/`);
    return;
  }


  // not ticket => go sso
  await ctx.redirect(SSO_AUTH_SERVER_URL);
}

async function doreamonOnlySolution(ctx) {
  // ticket && path === login && method === post => login or register
  const path = ctx.path;
  const method = ctx.method;

  const target = encodeURIComponent(`${getPrefix(ctx)}/login/doreamon/callback`);

  const {
    client_id,
    client_secret,
    redirect_uri,
  } = yapi.WEBCONFIG.oauth.doreamon;

  const { code } = ctx.request.query;

  // console.log('x: ', type, ticket, path, method, ctx.query, ctx.request.query);
  if (code && path === '/login/doreamon/callback' && method === 'GET') {
    // get doremaon token
    const tokenRes = await fetch(`https://login.zcorky.com/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: qs.stringify({
        client_id,
        client_secret,
        redirect_uri,
        grant_type: 'authorization_code',
        code,
        scope: 'todo',
        // state: 'todo',
      }),
      timeout: 10000, // 10s
    });

    if (!tokenRes.ok) {
      console.log('doremon get token failed:', await tokenRes.text());

      await delay(3000);
      await ctx.throw(500, {
        code: 5001001,
        message: 'Unable to get token from doreamon',
      });
    }

    const token = await tokenRes.json();
    // console.log('doreamon token: ', token);

    const userRes = await fetch('https://login.zcorky.com/user', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token.access_token}`,
      },
      timeout: 10000, // 10s
    });

    // 
    if (!userRes.ok) {
      console.log('doremon get user failed:', await userRes.text());

      await delay(3000);
      await ctx.throw(500, {
        code: 5001002,
        message: 'Unable to get user from doreamon',
      });
    }

    const user = await userRes.json();

    console.log('doreamon user: ', JSON.stringify(user, null, 2));

    const email = lodash.get(user, 'email');
    const username = lodash.get(user, 'username');
    const role = lodash.get(user, 'role');
    const nickname = lodash.get(user, 'nickname');

    // check user => login or sso
    await loginOrCreate(ctx, email, nickname || username, role);
    await ctx.redirect(`/`);
    return;
  }


  // not ticket => go sso
  await ctx.redirect(`https://login.zcorky.com/v2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&state=_`);
}

app.use(async function accesslog(ctx, next) {
  // static file
  if (ctx.request.path.startsWith('/prd/')) {
    return await next();
  }

  ctx.requestId = uuid();

  await next();

  ctx.set('X-Request-Id', ctx.requestId);

  const log = {
    requestId: ctx.requestId,
    ip: ctx.ip || '-',
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    request: `${ctx.method} ${ctx.path}`,
    status: ctx.status !== 404
      ? ctx.status : !!ctx.body
        ? 200 : 404,
    responseTime: ctx.responseTime,
    bodyBytesSent: ctx.get('Content-Length') || '-',
    httpRefer: ctx.get('Referer') || '-',
    httpUserAgent: ctx.get('User-Agent') || '-',
  };

  console.log(`${log.ip} [${log.time}] "${log.request}" ${log.status} ${log.responseTime} ${log.bodyBytesSent} "${log.httpRefer}" ${log.httpUserAgent} ${log.requestId}`);
});

app.use(async function responseTime(ctx, next) {
  const start = process.hrtime();

  await next();

  const deltaHr = process.hrtime(start);
  const delta = Math.round(deltaHr[0] * 1000 + deltaHr[1] / 1000000);

  ctx.responseTime = delta;

  ctx.set('X-Response-Time', `${delta}ms`);
});

// doc

app.use(async (ctx, next) => {
  // static file
  if (ctx.request.path.startsWith('/prd/')) {
    return await next();
  }

  // check is authorized
  const authorized = await checkAuthorize(ctx);
  if (authorized) {
    if (ctx.path === '/login') {
      return ctx.redirect('/');
    }

    if (['/api/user/reg', '/api/user/login'].some(e => e === ctx.path)) {
      ctx.status = 404;
      ctx.body = {
        code: 4041010,
        message: 'resource not found'
      };
      return;
    }

    return await next();
  }

  // // doreamon only
  if (yapi.WEBCONFIG.oauth.doreamon.only) {
    if (ctx.path === '/login') {
      return ctx.redirect('/');
    }

    if (['/api/user/reg', '/api/user/login'].some(e => e === ctx.path)) {
      ctx.status = 404;
      ctx.body = {
        code: 4041010,
        message: 'resource not found'
      };
      return;
    }

    return await doreamonOnlySolution(ctx);
  }

  // sso only
  if (yapi.WEBCONFIG.sso.only) {
    if (ctx.path === '/login') {
      return ctx.redirect('/');
    }

    if (['/api/user/reg', '/api/user/login'].some(e => e === ctx.path)) {
      ctx.status = 404;
      ctx.body = {
        code: 4041010,
        message: 'resource not found'
      };
      return;
    }

    return await ssoOnlySolution(ctx);
  }

  return await next();
});

app.use(proxyServer);

app.use(router.routes());
app.use(router.allowedMethods());

websocket(app);

app.use(async (ctx, next) => {
  if (/^\/(?!api)[a-zA-Z0-9\/\-_]*$/.test(ctx.path)) {
    ctx.path = '/';
    await next();
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.path.indexOf('/prd') === 0) {
    ctx.set('Cache-Control', 'max-age=8640000000');
    if (yapi.commons.fileExist(yapi.path.join(yapi.WEBROOT, 'static', ctx.path + '.gz'))) {
      ctx.set('Content-Encoding', 'gzip');
      ctx.path = ctx.path + '.gz';
    }
  }
  await next();
});


app.use(koaStatic(yapi.path.join(yapi.WEBROOT, 'static'), { index: indexFile, gzip: true }));


const server = app.listen(yapi.WEBCONFIG.port);

server.setTimeout(yapi.WEBCONFIG.timeout);

commons.log(
  `服务已启动，请打开下面链接访问: \nhttp://127.0.0.1${yapi.WEBCONFIG.port == '80' ? '' : ':' + yapi.WEBCONFIG.port
  }/`
);
