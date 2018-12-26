const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const appSrc = path.resolve(__dirname, '../src')
const publicPath = path.resolve(__dirname, '../public')
const build = path.resolve(__dirname, '../build')

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', path.resolve(appSrc, 'index.js')],
  output: {
    path: build,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
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
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true
            }
          }, {
            loader: 'less-loader'
          }
        ]
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(publicPath, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
      chunkFilename: 'static/css/common.[id].[hash:8].css'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(publicPath, 'static/image'), to: path.resolve(build, 'static/image') }
    ])
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
