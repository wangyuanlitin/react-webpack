const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const WebpackConfig = require('./webpack.config.common')

let config = Object.assign({}, WebpackConfig.baseConfig)

let plugins = WebpackConfig.pluginConfig.concat(
  new CleanWebpackPlugin(['build/*.*'], {
    root: path.resolve(__dirname, '../'),
    verbose: true,
    dry: false
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  })
)
Object.assign(config, {
  mode: 'production',
  module: WebpackConfig.moduleConfig(MiniCssExtractPlugin.loader),
  plugins: plugins
})

module.exports = config
