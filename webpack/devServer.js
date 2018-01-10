const path = require('path');
const mainDir = path.resolve(__dirname, '../');

module.exports = {
  contentBase: path.join(mainDir, 'src'),
  disableHostCheck: true,
  hot: true,
  proxy: {
    '/api/**': { target: 'http://localhost:3001' },
  },
  port: 3000,
  host: '0.0.0.0',
  historyApiFallback: true,
};
