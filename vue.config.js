const path = require('path')
const workboxPlugin = require('workbox-webpack-plugin')

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
    // 解决pwa插件在开发环境不引入的问题
    if (!buildForLegacy) {
      config.plugins.push(
        new workboxPlugin.InjectManifest(workboxOptions)
      )
    }
  },
  chainWebpack: (config) => {
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
          }
          return args
        })
    }
  }
}
