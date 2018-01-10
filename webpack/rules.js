const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const rules = {
    ts: {
      test: /\.tsx?$/,
      use: ['awesome-typescript-loader'],
      exclude: /node_modules/,
    },
    less: {
      test: /\.less$/,
      use: env.production
        ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader'],
          })
        : ['style-loader', 'css-loader', 'less-loader'],
      include: /node_modules/,
    },
  };

  return [rules.ts, rules.less];
};
