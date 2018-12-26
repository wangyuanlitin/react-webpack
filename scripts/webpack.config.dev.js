const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const appSrc = path.resolve(__dirname, '../src')
const publicPath = path.resolve(__dirname, '../public')
const build = path.resolve(__dirname, '../build')

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', path.resolve(appSrc, 'index.js')],
  output: {
    path: build,
    filename: 'acat/static/js/[name].[hash:8].js',
    chunkFilename: 'acat/static/js/[name].[chunkhash:8].chunk.js'
  },
  resolve: {
    alias: {
      Src: appSrc,
      Util: path.resolve(appSrc, 'util/'),
      Component: path.resolve(appSrc, 'components/'),
      Less: path.resolve(appSrc, 'less/')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    contentBase: publicPath, // 提供静态文件
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: { '': '' }
      }
    },
    hot: true,
    open: 'Google Chrome'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(publicPath, 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin()
  ]
}
