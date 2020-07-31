const yapi = require('yapi.js');
const baseModel = require('models/base.js');
const  mongoose = require('mongoose');

class webhookModel extends baseModel {
  getName() {
    return 'webhook';
  }

  getSchema() {
    return {
      uid: {
        type: Number,
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
      url: String,
      contentType: {
        type: String,
        default: 'application/json',
        enum: [
          'application/json',
          'application/x-www-form-urlencoded',
        ],
      },
      template: String,
    };
  }

  create(doc) {
    const instance = new this.model(doc);
    return instance.save();
  }

  list(projectId) {
    return this.model.findOne({
      projectId,
    });
  }

  retrieve(_id) {
    return this.model.findOne({
      _id,
    });
  }

  update(_id, doc) {
    return this.model.updateOne(
      {
        _id,
      },
      {
        $set: doc,
      },
      // {
      //   upsert: true
      // }
    );
  }

  delete(_id) {
    return this.model.delete({
      _id,
    });
  }

  getByProjectId(projectId) {
    return this.model.find({
      projectId: projectId
    });
  }
}

module.exports = webhookModel;
