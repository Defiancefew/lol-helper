const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const mainDir = path.resolve(__dirname, '../');
const tsConfig = require('../tsconfig.json');

module.exports = {
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  entry: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', './src/app/index.tsx'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        include: /node_modules/,
      },
    ],
  },
  output: {
    path: path.join(mainDir, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    modules: [path.join(mainDir, 'src'), 'node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.NamedModulesPlugin(),
    new TsConfigPathsPlugin(tsConfig),
  ],
  devServer: {
    contentBase: path.join(mainDir, 'src'),
    disableHostCheck: true,
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
};
