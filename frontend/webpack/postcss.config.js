const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars')({
      variables: function variables() {
        return require('./variables');
      },
      unknown: function unknown(node, name, result) {
        node.warn(result, `Unknown variable ${name}`);
      },
    }),
    require('postcss-nested'),
    require('postcss-automath'),
    require('postcss-modules')({
      globalModulePaths: [
        path.resolve(__dirname, '..', 'assets/css', 'global.css'),
        path.resolve(__dirname, '..', 'assets/css', 'bootstrap.css'),
      ],
    }),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
    }),
    require('cssnano'),
  ],
};
