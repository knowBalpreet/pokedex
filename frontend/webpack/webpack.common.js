const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      loaders.JSLoader,
      loaders.htmlLoader,
      loaders.LessLoader,
      loaders.SVGLoader,
      loaders.ESLintLoader,
      loaders.TSLintLoader,
      loaders.FONTLoader,
      loaders.CSSLoader,
      loaders.FileLoader
    ],
  },
  plugins: [
    plugins.HtmlWebPackPlugin,
    plugins.CleanWebpackPlugin,
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin,
  ],
};