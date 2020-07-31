const yapi = require('../yapi.js');
const baseModel = require('./base.js');

class webhookModel extends baseModel {
  getName() {
    return 'webhook';
  }

  getSchema() {
    return {
      // project.uid
      uid: {
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
      },
      template: String,
    };
  }

  get(uid) {
    return this.model.find({
      uid: uid
    });
  }

  up(uid, basecode, type) {
    return this.model.update(
      {
        uid: uid
      },
      {
        type: type,
        basecode: basecode
      },
      {
        upsert: true
      }
    );
  }
}

module.exports = webhookModel;
