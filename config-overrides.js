const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = function override (config) {
  config.resolve.alias['@spacetimexyz/client'] = '@spacetimexyz/client/web'
  const fallback = config.resolve.fallback || {}
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  })
  config.resolve.fallback = fallback
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/@spacetimexyz/lang/web/*.wasm',
          to: 'static/js/[name][ext]',
        },
      ],
    }),
  ])
  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // disable the behavior
    },
  })
  return config
}
