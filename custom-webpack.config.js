const webpack = required('webpack');
const pkg = require('./package.json');

module.exports = (config, options) => {
  config.plugins = [
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(pkg.version),
      'process.env': {
        'USERNAME': JSON.stringify(process.env)
      }
    }),
  ];
  return config;
};
