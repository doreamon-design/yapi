const baseController = require('controllers/base');
const yapi = require('yapi');
const projectModel = require('models/project');

const model = require('./model');
const utils = require('./service')

class WebhookController extends baseController {
  constructor(ctx) {
    super(ctx);
    this.model = yapi.getInst(model);
    this.projectModel = yapi.getInst(projectModel);
    this.utils = yapi.getInst(utils);
  }

  /**
   * 保存定时任务
   * @param {*} ctx 
   */
  async upSync(ctx) {
    let requestBody = ctx.request.body;
    let projectId = requestBody.project_id;
    if (!projectId) {
      return (ctx.body = yapi.commons.resReturn(null, 408, '缺少项目Id'));
    }

    if ((await this.checkAuth(projectId, 'project', 'edit')) !== true) {
      return (ctx.body = yapi.commons.resReturn(null, 405, '没有权限'));
    }

    let result;
    if (requestBody.id) {
      result = await this.model.up(requestBody);
    } else {
      result = await this.model.save(requestBody);
    }

    //操作定时任务
    if (requestBody.is_sync_open) {
      this.interfaceSyncUtils.addSyncJob(projectId, requestBody.sync_cron, requestBody.syncon_url, requestBody.sync_mode, requestBody.uid);
    } else {
      this.interfaceSyncUtils.deleteSyncJob(projectId);
    }
    return (ctx.body = yapi.commons.resReturn(result));
  }

  /**
   * 查询定时任务
   * @param {*} ctx 
   */
  async getSync(ctx) {
    let projectId = ctx.query.project_id;
    if (!projectId) {
      return (ctx.body = yapi.commons.resReturn(null, 408, '缺少项目Id'));
    }
    let result = await this.model.getByProjectId(projectId);
    return (ctx.body = yapi.commons.resReturn(result));
  }

}


module.exports = WebhookController;