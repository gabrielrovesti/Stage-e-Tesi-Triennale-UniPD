// webpack.config.js

module.exports = {
    // ...other configuration options...
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser')
      }
    }
  }
  