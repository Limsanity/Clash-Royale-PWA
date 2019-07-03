const path = require('path')
const AutoDllPlugin = require('autodll-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const ModernDLLPlugin = require('./plugins/modernDLLPlugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const buildForLegacy = process.env.NODE_ENV === 'production' && !process.env.VUE_CLI_MODERN_BUILD

function resolve (dir) {
  return path.join(__dirname, dir)
}

const workboxOptions = {
  swSrc: resolve('src/sw/serviceWorker.js'),
  swDest: 'serviceWorker.js',
  importWorkboxFrom: 'disabled',
  exclude: [/^workbox/, /images/, /index\.html/, /indexDB\.js/]
}

module.exports = {
  configureWebpack: (config) => {
    config.plugins.push(
      new AutoDllPlugin({
        inject: true,
        debug: true,
        filename: '[name].[hash].js',
        path: './dll',
        entry: {
          vendor: [
            'vue/dist/vue.esm.js',
            'vuex',
            'vue-router',
            'axios'
          ]
        }
      })
    )
    config.plugins.push(
      new workboxPlugin.InjectManifest(workboxOptions)
    )
    config.plugins.push(
      new ModernDLLPlugin()
    )
    config.plugins.push(
      new VuetifyLoaderPlugin()
    )
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      config.output
        .set('filename', 'static/js/[name].[hash].js')
        .set('chunkFilename', 'static/js/[name].[hash].js')
    }

    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('styles', resolve('src/assets/styles'))
      .set('utils', resolve('src/utils'))

    // configure pwa
    if (!buildForLegacy) {
      config
        .plugin('copy')
        .tap(args => {
          if (args.length !== 0) {
            args[0][0].ignore = process.env.NODE_ENV === 'production' ? ['*.dev.*'] : ['*.prod.*']
            args[0].push({
              from: resolve('src/utils/indexDB.js'),
              to: resolve('dist')
            })
            args[0].push({
              from: resolve('src/utils/swHelper.js'),
              to: resolve('dist')
            })
          }
          return args
        })
    }
  }
}
