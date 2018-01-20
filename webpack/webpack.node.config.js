const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const mainDir = path.resolve(__dirname, '../');
const resolve = require('./resolve');
const rules = require('./rules');

module.exports = {
  entry: './src/server/index.ts',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.join(mainDir, 'dist'),
    filename: 'server.js',
    chunkFilename: 'server.js',
    publicPath: '/',
  },
  module: {
    rules: [rules.ts],
  },
  resolve,
  externals: [nodeExternals()],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({}),
    new webpack.LoaderOptionsPlugin({
      context: process.cwd(),
      minimize: true,
      debug: false,
    }),
  ],
};
