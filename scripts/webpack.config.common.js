const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const srcPath = path.resolve(__dirname, '../src')
const publicPath = path.resolve(__dirname, '../public')
const buildPath = path.resolve(__dirname, '../build')

const baseConfig = {
  entry: path.resolve(srcPath, 'index.jsx'),
  output: {
    path: buildPath,
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      Src: srcPath,
      Component: path.resolve(srcPath, 'components/'),
      Container: path.resolve(srcPath, 'containers/'),
      static: path.resolve(srcPath, '../public/static/')
    }
  }
}

function moduleConfig (styleLoader) {
  return {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.less|css$/,
        use: [
          styleLoader,
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}

const pluginConfig = [
  new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve(__dirname, '../public/index.html')
  }),
  new CopyWebpackPlugin([{ from: publicPath, to: buildPath }])
]

module.exports = { baseConfig: baseConfig, moduleConfig: moduleConfig, pluginConfig: pluginConfig }
