const yapi = require('../yapi.js');
const axios = require('axios');

module.exports = async (ctx, next) => {
  const _method = ctx.method;
  const path = ctx.path;
  // let header = ctx.request.header;

  if (!(_method === 'POST' && path === '/proxy')) {
    return await next();
  }

  const reqParams = await ctx.request.body;

  const {
    method,
    url,
    headers,
    data,
  } = reqParams;

  // console.log('reqParams:', reqParams);

  const startAt = Date.now();

  const aRes = await axios({
    method,
    url,
    headers,
    data,
    timeout: 10000,
  });

  // const aRes = await axios.get(url);
  
  const resParams = {
    // id: 'y-request-0',
    status: aRes.status,
    statusText: aRes.statusText,
    // @TODO
    header: aRes.headers,
    body: aRes.data,
  };
  
  // console.log('resParams:', resParams);
  const runTime = Date.now() - startAt;

  ctx.status = 200;
  ctx.body = {
    req: reqParams,
    res: resParams,
    runTime,
  };
};
