import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as path from 'path'
import * as commonConfig from './common.webpack'
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonConfig, {
  name: 'server',
  devtool: 'source-map',
  mode: 'production',
  target: 'node',
  entry: ["@babel/polyfill", path.resolve(__dirname, '../src/ssr-middleware/index.tsx')],
  output: {
    libraryTarget: 'commonjs2',
    publicPath: '/',
    filename: 'ssr.middleware.js',
    path: path.join(process.cwd(), '.build')
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: true,
              name: '[name].[ext]',
              publicPath: 'images/'
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
})
