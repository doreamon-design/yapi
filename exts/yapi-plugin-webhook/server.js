const yapi = require('yapi');

const controller = require('./controller');
// const interfaceSyncUtils = require('./services/webhook');

module.exports = function () {
  // yapi.getInst(interfaceSyncUtils);

  this.bindHook('add_router', function (addRouter) {

    addRouter({
      controller: controller,
      method: 'get',
      path: 'webhook/list',
      action: 'list'
    });

    addRouter({
      controller: controller,
      method: 'post',
      path: 'webhook/create',
      action: 'create'
    });

    addRouter({
      controller: controller,
      method: 'post',
      path: 'webhook/update',
      action: 'update'
    });

    addRouter({
      controller: controller,
      method: 'post',
      path: 'webhook/delete',
      action: 'delete'
    });

    addRouter({
      controller: controller,
      method: 'post',
      path: 'webhook/test',
      action: 'test'
    });

    // addRouter({
    //   controller: controller,
    //   method: 'post',
    //   path: 'webhook/save',
    //   action: 'upSync'
    // });
  });

};