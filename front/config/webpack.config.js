const path = require('path');
const glob = require('glob');

const SRC_PATH    = path.resolve(__dirname, '../src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');

const entries = {};

glob.sync('**/main*.js', {
  cwd: SRC_PATH,
  ignore: '**/_*.js'
}).map((key) =>  {
  entries[key] = path.resolve(SRC_PATH, key);
});

console.log(entries);
module.exports = {
  // entry: SRC_PATH + '/assets/js/main.js',
  entry: entries,

  output: {
    filename: 'main.js',
    path: PUBLIC_PATH + '/assets/js/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ]
  }
};
