var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  plugins: ['qunar', 'antd'],
  devtool:  'cheap-source-map',
  config: {
    exports: [
      './index.js'
    ],
    modifyWebpackConfig: function(baseConfig) {
      baseConfig.context = path.resolve(__dirname, "client");
      baseConfig.watch = true;
      return baseConfig;
    }
  },
  server: {
    // true/false，默认 false，效果相当于 ykit server --hot
    hot: true,
    // true/false，默认 false，开启后可在当前打开的页面提示打包错误
    overlay: true 
  },
  hooks: {},
  commands: []
};
