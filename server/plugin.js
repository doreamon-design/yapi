const yapi = require('./yapi.js');
const plugin_path = yapi.path.join(yapi.WEBROOT, 'plugins');
const plugin_system_path = yapi.path.join(yapi.WEBROOT, 'exts');
const initPlugins = require('../common/lib.js').initPlugins;
var extConfig = require('../common/config.js').exts;
var hooks = {
    //第三方sso登录钩子，暂只支持设置一个
    'third_login': {
        type: 'single',
        listener: null
    },
    //增加接口成功后触发
    'interface_add': {
        type: 'multi',
        listener: []
    },
    //删除接口成功后触发
    'interface_del': {
        type: 'multi',
        listener: []
    },
    'project_add':{
        type: 'multi',
        listener: []
    },
    'project_del':{
        type: 'multi',
        listener: []
    },
    //MockServer生成mock数据后触发
    mock_after: {
        type: 'multi',
        listener: []
    },
    //增加路由的钩子
    add_router: {
        type: 'multi',
        listener: []
    }
};

function bindHook(name, listener) {
    if (!name) throw new Error('缺少hookname');
    if (name in hooks === false) {
        throw new Error('不存在的hookname');
    }
    if (hooks[name].type === 'multi') {
        hooks[name].listener.push(listener);
    } else {
        if (typeof hooks[name].listener === 'function') {
            throw new Error('重复绑定singleHook(' + name + '), 请检查');
        }
        hooks[name].listener = listener;
    }

}

async function emitHook(name) {
    if (hooks[name] && typeof hooks[name] === 'object') {
        let args = Array.prototype.slice.call(arguments, 1);
        if (hooks[name].type === 'single' && typeof hooks[name].listener === 'function') {
            return await hooks[name].listener.apply(yapi, args);
        }
        if (Array.isArray(hooks[name].listener)) {
            let listenerList = hooks[name].listener;
            for(let i=0, l = listenerList.length; i< l; i++){
                await listenerList[i].apply(yapi, args);
            }
        }
    }
}

function emitHookSync(name) {
    if (hooks[name] && typeof hooks[name] === 'object') {
        let args = Array.prototype.slice.call(arguments, 1);
        if (hooks[name].type === 'single' && typeof hooks[name].listener === 'function') {
            return hooks[name].listener.apply(yapi, args);
        }
        if (Array.isArray(hooks[name].listener)) {
            hooks[name].listener.forEach((listener) => {
                listener.apply(yapi, args)
            })
        }
    }
}


yapi.bindHook = bindHook;
yapi.emitHook = emitHook;
yapi.emitHookSync = emitHookSync;



let pluginsConfig = initPlugins(yapi.WEBCONFIG.plugins);

pluginsConfig.forEach(plugin => {
    if (!plugin || plugin.enable === false || plugin.server === false) return null;

    if (!yapi.commons.fileExist(yapi.path.join(plugin_path, 'yapi-plugin-' + plugin.name + '/server.js'))) {
        console.error(`config.json配置了插件${plugin},但plugins目录没有找到此插件，请安装此插件`);
        process.exit();
    }
    let pluginModule = require(yapi.path.join(plugin_path, 'yapi-plugin-' + plugin.name + '/server.js'));
    pluginModule.call(yapi, plugin)
})

extConfig = initPlugins(extConfig);

extConfig.forEach(plugin => {
    if (!plugin || plugin.enable === false || plugin.server === false) return null;

    if (!yapi.commons.fileExist(yapi.path.join(plugin_system_path, 'yapi-plugin-' + plugin.name + '/server.js'))) {
        console.error(`config.json配置了插件${plugin},但plugins目录没有找到此插件，请安装此插件`);
        process.exit();
    }
    let pluginModule = require(yapi.path.join(plugin_system_path, 'yapi-plugin-' + plugin.name + '/server.js'));
    pluginModule.call(yapi, plugin)
    yapi.commons.log('init plugins success...')
})

//delete bindHook方法，避免误操作
delete yapi.bindHook


