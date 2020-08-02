import Component from './component'

module.exports = function() {
  this.bindHook('sub_setting_nav', function hander(routers) {
    routers.webhook = {
      name: 'Webhook',
      component: Component
    };
  });
};
