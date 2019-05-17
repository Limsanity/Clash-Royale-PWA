var path = require("path");
var webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue/dist/vue.esm.js', 'vuex', 'vue-router', 'axios']
  },
  output: {
    path: resolve('static/dll'), // 打包后文件输出的位置
    filename: '[name].[chunkhash].dll.js',
    library: '[name]_library'
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: resolve('static/dll/[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
};
