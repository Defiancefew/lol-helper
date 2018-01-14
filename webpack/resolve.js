const path = require('path');
const mainDir = path.resolve(__dirname, '../');

module.exports = {
  extensions: ['.js', '.json', '.ts', '.tsx'],
  modules: [path.join(mainDir, 'src'), 'node_modules', path.join(mainDir, 'src', 'app')],
};
