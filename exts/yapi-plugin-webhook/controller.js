const baseController = require('controllers/base');
const yapi = require('yapi');

const model = require('./model');

class WebhookController extends baseController {
  constructor(ctx) {
    super(ctx);
    this.model = yapi.getInst(model);
    // this.utils = yapi.getInst(utils);
  }

  async list(ctx) {
    const projectId = +ctx.query.projectId;

    if (!projectId) {
      return (ctx.body = yapi.commons.resReturn(null, 408, '缺少项目Id'));
    }

    if ((await this.checkAuth(projectId, 'project', 'view')) !== true) {
      return (ctx.body = yapi.commons.resReturn(null, 405, '没有权限'));
    }

    const data = await this.model.list(projectId);
    ctx.body = yapi.commons.resReturn(data);
  }

  async create(ctx) {
    const projectId = +ctx.query.projectId;
    const {
      name,
      method,
      url,
      contentType,
      template,
    } = ctx.request.body;

    if (!projectId) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '项目id不能为空'));
    }

    if (!name) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'name不能为空'));
    }

    if (!method) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'method不能为空'));
    }

    if (!url) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'url不能为空'));
    }

    if (!contentType) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'contentType不能为空'));
    }

    if (!template) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'template不能为空'));
    }

    if ((await this.checkAuth(projectId, 'project', 'edit')) !== true) {
      return (ctx.body = yapi.commons.resReturn(null, 405, '没有权限'));
    }

    const doc = {
      uid: this.uuid(),
      projectId,
      name,
      method,
      url,
      contentType,
      template,
      createdAt: yapi.commons.time(),
      updatedAt: yapi.commons.time()
    };

    const data = await this.model.create(doc);

    ctx.body = yapi.commons.resReturn(data);
  }

  async update(ctx) {
    const projectId = +ctx.query.projectId;
    const uid = ctx.query.uid;
    const {
      name,
      method,
      url,
      contentType,
      template,
    } = ctx.request.body;

    if (!projectId) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '项目id不能为空'));
    }

    if (!uid) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '缺少Webhook uid'));
    }

    const doc = {
      name,
      method,
      url,
      contentType,
      template,
      updatedAt: yapi.commons.time()
    };

    const data = await this.model.update(projectId, uid, doc);

    ctx.body = yapi.commons.resReturn(data);
  }

  async delete(ctx) {
    const projectId = +ctx.query.projectId;
    const uid = ctx.query.uid;

    if (!projectId) {
      return (ctx.body = yapi.commons.resReturn(null, 408, '缺少项目Id'));
    }

    if (!uid) {
      return (ctx.body = yapi.commons.resReturn(null, 408, '缺少Webhook uid'));
    }

    if ((await this.checkAuth(projectId, 'project', 'edit')) !== true) {
      return (ctx.body = yapi.commons.resReturn(null, 405, '没有权限'));
    }

    const data = await this.model.delete(projectId, uid);
    ctx.body = yapi.commons.resReturn(data);
  }

  async test(ctx) {
    const projectId = +ctx.query.projectId;
    const {
      uid,
      method,
      url,
      contentType,
      template,
    } = ctx.request.body;

    if (!method) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'method不能为空'));
    }

    if (!url) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'url不能为空'));
    }

    if (!contentType) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'contentType不能为空'));
    }

    if (!template) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'template不能为空'));
    }

    if ((await this.checkAuth(projectId, 'project', 'edit')) !== true) {
      return (ctx.body = yapi.commons.resReturn(null, 405, '没有权限'));
    }

    const to = [{
      uid,
      method,
      url,
      contentType,
      template,
    }];

    const user = {
      username: '测试用户账号',
    };
    const project = {
      name: '测试项目',
    };
    const data = {
      title: '测试数据',
      method: 'GET',
      path: '/test-url',
      docUrl: '...',
    };
    const metadata = {
      title: `${user.username} 更新了接口 ${data.title} (项目名：${project.name})`,
      content: `修改用户: ${user.username}
项目名：${project.name}
接口路径: [${data.method}] ${data.path}
详细改动日志: 改动了....`,
      modifier: {
        name: user.username,
      },
      project,
      api: {
        name: data.title,
        method: data.method,
        path: data.path,
        docUrl: data.docUrl,
      },
      diff: {
        html: '<span>变化html</span>',
      },
    };

    try {
      await yapi.commons.sendWebhook({
        to,
        metadata,
      });

      await this.model.tryToUpdateDeactiveByUid(projectId, uid);

      await yapi.commons.success(ctx, null);
    } catch (err) {
      console.log(err);
      const { webhook, responseText } = err;

      if (webhook && webhook.uid) {
        await this.model.update(projectId, uid, {
          active: false,
          error: responseText,
        });
      }
      
      await yapi.commons.fail(ctx, 4001000, err.message || 'Webhook 测试失败', 400);
    }
  }
}


module.exports = WebhookController;