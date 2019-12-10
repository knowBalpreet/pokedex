const loaders = require('./loaders')
module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  }
};