const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildFolder = 'build';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, buildFolder)
  },
  plugins: [
    new CleanWebpackPlugin([buildFolder]),
    new CopyWebpackPlugin([
      { from: './public', to: './' }
    ]),
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader?-url"
        },
        {
          loader: "sass-loader",
        }
      ]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, buildFolder),
    compress: true,
    port: 9000,
  }
};
