const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const workboxPlugin = require('workbox-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[id].[chunkhash].js',
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
        include: [resolve('src')]
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
        from: resolve('src/sw')
      },
      {
        from: resolve('static/workbox')
      }
    ]),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./../static/js/vendor-manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve('static/js/*.js'),
    }),
    new workboxPlugin.InjectManifest({
      swSrc: './src/sw/serviceWorker.js',
      swDest: 'serviceWorker.js',
      importWorkboxFrom: 'local'
    })
  ]
};
