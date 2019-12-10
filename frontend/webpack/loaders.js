const path = require('path');
const glob = require('glob');

const PATHS = {
  src: path.join(__dirname, '../', 'src'),
};

const CSSLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [{
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: `${__dirname}/postcss.config.js`,
        },
      },
    },
  ],
};

const PurgeCssLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [{
    loader: '@americanexpress/purgecss-loader',
    options: {
      paths: glob.sync(`${PATHS.src}/**/*`, {
        nodir: true
      }),
    },
  }],
};

const FONTLoader = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/webfonts/',
    },
  }, ],
};

const LessLoader = {
  test: /\.less$/,
  use: [{
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'less-loader',
      options: {
        paths: [path.resolve(__dirname, 'node_modules')],
        javascriptEnabled: true,
      },
    },
  ],
};

const htmlLoader = {
  test: /\.html$/,
  use: [{
    loader: 'html-loader',
  }, ],
};

const JSLoader = {
  test: /\.(ts(x?)|js(x?))$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      babelrcRoots: ['.', '../'],
    },
  },
};

const SVGLoader = {
  test: /\.svg/,
  use: {
    loader: 'svg-url-loader',
    options: {},
  },
};

const ESLintLoader = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {
      configFile: `${__dirname}/../.eslintrc`,
    },
  },
};

const TSLintLoader = {
  test: /\.tsx$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: {
    loader: 'tslint-loader',
    options: {},
  },
};

const FileLoader = {
  test: /\.(png|jpe?g|gif)$/i,
  exclude: /node_modules/,
  use: [
      {
        loader: 'file-loader',
      },
    ],
  }

module.exports = {
  JSLoader,
  htmlLoader,
  CSSLoader,
  PurgeCssLoader,
  LessLoader,
  SVGLoader,
  ESLintLoader,
  TSLintLoader,
  FONTLoader,
  FileLoader
};