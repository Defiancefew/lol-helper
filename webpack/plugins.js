const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const mainDir = path.resolve(__dirname, '../');
const tsConfig = require('../tsconfig.json');

module.exports = env => {
  const devPlugins = [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()];

  const prodPlugins = [
    new webpack.LoaderOptionsPlugin({
      context: mainDir,
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new CleanWebpackPlugin('dist', { root: process.cwd() }),
    new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ];

  return [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: env.production ? 'production' : 'development',
    }),
    new HtmlWebpackPlugin(),
    ...(env.production ? prodPlugins : devPlugins),
  ];
};
