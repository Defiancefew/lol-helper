const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const mainDir = path.resolve(__dirname, '../');
const tsConfig = require('../tsconfig.json');
const rules = require('./rules');
const plugins = require('./plugins');
const devServer = require('./devServer');
const entry = require('./entry');
const resolve = require('./resolve');

module.exports = env => ({
  target: 'web',
  devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
  entry: entry(env),
  module: {
    rules: rules(env),
  },
  output: {
    path: path.join(mainDir, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve,
  plugins: plugins(env),
  devServer: env.development && devServer,
});
