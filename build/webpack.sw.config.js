const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.join(__dirname, '../'),
  entry: {
    serviceWorker: './src/sw/serviceWorker.js'
  },
  output: {
    filename: '[name].js',
    path: resolve('static/sw'),
    publicPath: '/'
  },
}
