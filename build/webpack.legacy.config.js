const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')
const ModuleHtmlPlugin = require('../plugins/moduleHtmlPlugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name]-legacy.[chunkhash].js',
    chunkFilename: 'static/js/[id]-legacy.[chunkhash].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[id].[contenthash:8].css'
    }),
    new ModuleHtmlPlugin()
  ]
})

module.exports = buildWebpackConfig
