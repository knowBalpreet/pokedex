const glob = require('glob');
const path = require('path');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _HtmlWebPackPlugin = require('html-webpack-plugin');
const _CompressionPlugin = require('compression-webpack-plugin');
const _BrotliPlugin = require('brotli-webpack-plugin');
const _StyleLintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin: _CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebPackPlugin = new _HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: '[name].bundle.css',
  chunkFilename: '[id].css',
});

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../../*'),
  files: '**/*.css',
  failOnError: false,
  quiet: false,
});

const CompressionPlugin = new _CompressionPlugin({
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  threshold: 10240,
  minRatio: 0.7,
});

const BrotliPlugin = new _BrotliPlugin({
  asset: '[path].br[query]',
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0.7,
});

const CleanWebpackPlugin = new _CleanWebpackPlugin();

module.exports = {
  MiniCssExtractPlugin,
  HtmlWebPackPlugin,
  StyleLintPlugin,
  CompressionPlugin,
  BrotliPlugin,
  CleanWebpackPlugin,
};
