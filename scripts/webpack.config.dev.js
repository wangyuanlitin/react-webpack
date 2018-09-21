const path = require('path')

const WebpackConfig = require('./webpack.config.common')

let config = Object.assign({}, WebpackConfig.baseConfig)

Object.assign(config, {
  mode: 'development',
  devtool: 'source-map',
  module: WebpackConfig.moduleConfig('style-loader'),
  plugins: WebpackConfig.pluginConfig,
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    open: 'Google Chrome'
  }
})

module.exports = config
