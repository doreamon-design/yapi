import yapi from '../yapi.js';
import baseModel from './base.js';
// import userModel from '../models/user.js';

class logModel extends baseModel {
    getName() {
        return 'log';
    }

    getSchema() {
        return {
            uid: { type: Number, required: true },
            typeid: { type: Number, required: true },
            type: { type: String,enum:['user', 'group', 'interface','project', 'other', 'interface_col'], required: true },
            content: { type: String, required: true },
            username: { type: String, required: true },
            add_time: Number
        };
    }

    /**
     * @param {String} content log内容
     * @param {Enum} type log类型， ['user', 'group', 'interface', 'project', 'other']
     * @param {Number} uid 用户id
     * @param {String} username 用户名
     * @param {Number} typeid 类型id
     * @param {Number} add_time 时间
     */
    save(data) {
        let saveData = {
            content: data.content,
            type: data.type,
            uid: data.uid,
            username: data.username,
            typeid: data.typeid,
            add_time: yapi.commons.time()
        };
        let log = new this.model(saveData);

        return log.save();
    }
    
    del(id) {
        return this.model.deleteOne({
            _id: id
        });
    }

    list(typeid,type) {
        return this.model.find({
            typeid: typeid,
            type: type
        })
            .exec();
    }
    

    listWithPaging(typeid,type, page, limit) {
        page = parseInt(page);
        limit = parseInt(limit);

        return this.model.find({
            type: type
        }).skip((page - 1) * limit).limit(limit).exec();
    }

    listCount(typeid,type) {
        return this.model.count({
            typeid: typeid,
            type: type
        });
    }
}

module.exports = logModel;