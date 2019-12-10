const plugins = require('./plugins');
const loaders = require('./loaders');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    splitChunks: {
      // cacheGroups: {
      //   styles: {
      //     name: 'styles',
      //     test: /\.css$/,
      //     chunks: 'all',
      //     enforce: true
      //   }
      // },
      chunks: 'all',
      minSize: 0,
    },
  },
  module: {
    rules: [
      loaders.PurgeCssLoader
    ]
  },

  plugins: [plugins.BrotliPlugin, plugins.CompressionPlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
};