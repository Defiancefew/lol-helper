const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.ts = {
  test: /\.tsx?$/,
  use: [
    { loader: 'cache-loader' },
    {
      loader: 'thread-loader',
      options: {
        // there should be 1 cpu for the fork-ts-checker-webpack-plugin
        workers: require('os').cpus().length - 1,
      },
    },
    {
      loader: 'babel-loader',
    },
    {
      loader: 'ts-loader',
      options: {
        happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
      },
    },
  ],
  exclude: /node_modules/,
};

exports.less = env => ({
  test: /\.less$/,
  use: env.production
    ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader'],
      })
    : ['style-loader', 'css-loader', 'less-loader'],
  include: /node_modules/,
});
