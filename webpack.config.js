const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SassPlugin = require('sass-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './public', to: './' }
    ]),
    new SassPlugin('./style/index.scss', {
      sourceMap: false,
      sass: { outputStyle: 'compressed' },
      autoprefixer: false
    }),
  ]
};
