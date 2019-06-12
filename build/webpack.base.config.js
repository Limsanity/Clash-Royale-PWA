const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const ModuleHtmlPlugin = require('../plugins/moduleHtmlPlugin')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.join(__dirname, '../'),
  stats:{
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? 'static/js/[name].[chunkhash].js' : 'static/js/[name].[hash].js',
    chunkFilename: process.env.NODE_ENV === 'production' ? 'static/js/[id].[chunkhash].js' : 'static/js/[id].[hash].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', 'json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'styles': resolve('src/assets/styles'),
      'utils': resolve('src/utils')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [resolve('src')]
      },
      {
        test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src')],
          options: {
            presets: [["@babel/preset-env", {
              targets: {
                browsers: [
                  'Chrome >= 60',
                  'Safari >= 10.1',
                  'iOS >= 10.3',
                  'Firefox >= 54',
                  'Edge >= 15',
                ],
              }
            }]],
            plugins: [["@babel/plugin-transform-runtime", { "corejs": 2 }]],
            sourceType: "unambiguous"
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('src/sw'),
        ignore: ['*.js']
      },
      {
        from: resolve('src/utils/indexDB.js')
      },
      {
        from: resolve('static/workbox'),
        to: resolve('dist/workbox'),
        ignore: process.env.NODE_ENV === 'production' ? ['*.dev.*'] : ['*.prod.*']
      }
    ]),
    new workboxPlugin.InjectManifest({
      swSrc: path.join(__dirname, '../src/sw/serviceWorker.js'),
      swDest: 'serviceWorker.js',
      importWorkboxFrom: 'disabled',
      exclude: [/^workbox/, /index\.html/, /indexDB\.js/]
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ModuleHtmlPlugin()
  ]
};
