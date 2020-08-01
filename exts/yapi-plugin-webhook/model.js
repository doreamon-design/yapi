const yapi = require('yapi.js');
const baseModel = require('models/base.js');
const  mongoose = require('mongoose');

class webhookModel extends baseModel {
  getName() {
    return 'webhook';
  }

  getSchema() {
    return {
      name: {
        type: String,
        required: true,
      },
      uid: {
        type: String,
        required: true,
      },
      projectId: {
        type: Number,
        required: true,
      },
      method: {
        type: String,
        default: 'POST',
      },
      url: {
        type: String,
      },
      contentType: {
        type: String,
        default: 'application/json',
        enum: [
          'application/json',
          'application/x-www-form-urlencoded',
        ],
      },
      template: String,
      createdAt: Number,
      updatedAt: Number,
      // 是否启用
      active: {
        type: Boolean,
        default: true,
      },
      // 最近错误信息
      error: {
        type: String,
      },
    };
  }

  async create(doc) {
    const instance = new this.model(doc);
    return instance.save();
  }

  async list(projectId) {
    const total = await this.model.countDocuments({ projectId });

    const data = await this.model
      .find({
        projectId,
      })
      .sort({
        updatedAt: -1,
      });

    return {
      total,
      data,
    };
  }

  async retrieve(projectId, uid) {
    return this.model.findOne({
      projectId,
      uid,
    });
  }

  async update(projectId, uid, doc) {
    return this.model.updateOne(
      {
        projectId,
        uid,
      },
      {
        $set: doc,
      },
      // {
      //   upsert: true
      // }
    );
  }

  async delete(projectId, uid) {
    return this.model.deleteOne({
      projectId,
      uid,
    });
  }

  async getByProjectId(projectId) {
    return this.model.find({
      projectId,
    });
  }

  async getActiveWebhooksByProjectId(projectId) {
    return this.model
      .find({
        projectId,
        active: true,
      });
  }

  async getDeactiveByUid(projectId, uid) {
    return this.model.findOne({
      projectId,
      uid,
      active: {
        $ne: true,
      },
    });
  }

  async tryToUpdateDeactiveByUid(projectId, uid) {
    if (!uid) {
      return ;
    }

    const doc = await this.getDeactiveByUid(projectId, uid);
    // console.log('deactive doc: ', doc);
    if (doc) {
      doc.active = true;
      doc.error = '';
      doc.updatedAt = yapi.commons.time();
      return doc.save();
    }
  }
}

module.exports = webhookModel;
