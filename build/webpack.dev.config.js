const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: false,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/index.html' },
      ],
    },
    proxy: {
      '/api': {
        target: 'https://localhost:3001/',
        changeOrigin: true,
        secure: false
      },
      '/auth': {
        target: 'https://localhost:3001/',
        changeOrigin: true,
        secure: false
      }
    },
    hot: true,
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8080'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      clearConsole: true
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static/images'),
        to: 'static/images'
      },
    ])
  ]
})

module.exports = devWebpackConfig
