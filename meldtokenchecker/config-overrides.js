<<<<<<< HEAD
const webpack = require('webpack'); // Import webpack

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  });
  config.resolve.fallback = fallback;

  // Add .mjs to extensions
  config.resolve.extensions = [...(config.resolve.extensions || []), '.mjs'];

  // Webpack plugin for process and Buffer
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
=======
const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ),
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      assert: require.resolve('assert/'), // Add this line
    };
    return config;
  }
);
>>>>>>> dd5d4a4fa28202cc9f6e7dab3f0d376c53eacd71
