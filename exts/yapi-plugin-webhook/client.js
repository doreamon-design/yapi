import Component from './component'

function hander(routers) {
  routers.test = {
    name: 'Webhook',
    component: Component,
  };
}

module.exports = function() {
  this.bindHook('sub_setting_nav', hander);
};
