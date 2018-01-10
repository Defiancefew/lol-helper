module.exports = env => {
  const baseEntry = ['./src/app/index.tsx'];
  const devEntry = ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server'];

  return env.production ? baseEntry : [...baseEntry, ...devEntry];
};
