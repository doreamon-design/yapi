const baseController = require('controllers/base');
const yapi = require('yapi');
const projectModel = require('models/project');

const model = require('./model');
// const utils = require('./service')

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

  // /**
  //  * 保存定时任务
  //  * @param {*} ctx 
  //  */
  // async upSync(ctx) {
  //   let requestBody = ctx.request.body;
  //   let projectId = requestBody.project_id;
  //   if (!projectId) {
  //     return (ctx.body = yapi.commons.resReturn(null, 408, '缺少项目Id'));
  //   }

  //   if ((await this.checkAuth(projectId, 'project', 'edit')) !== true) {
  //     return (ctx.body = yapi.commons.resReturn(null, 405, '没有权限'));
  //   }

  //   let result;
  //   if (requestBody.id) {
  //     result = await this.model.up(requestBody);
  //   } else {
  //     result = await this.model.save(requestBody);
  //   }

  //   //操作定时任务
  //   if (requestBody.is_sync_open) {
  //     this.interfaceSyncUtils.addSyncJob(projectId, requestBody.sync_cron, requestBody.syncon_url, requestBody.sync_mode, requestBody.uid);
  //   } else {
  //     this.interfaceSyncUtils.deleteSyncJob(projectId);
  //   }
  //   return (ctx.body = yapi.commons.resReturn(result));
  // }

  // /**
  //  * 查询定时任务
  //  * @param {*} ctx 
  //  */
  // async getSync(ctx) {
  //   let projectId = ctx.query.project_id;
  //   if (!projectId) {
  //     return (ctx.body = yapi.commons.resReturn(null, 408, '缺少项目Id'));
  //   }
  //   let result = await this.model.getByProjectId(projectId);
  //   return (ctx.body = yapi.commons.resReturn(result));
  // }

}


module.exports = WebhookController;