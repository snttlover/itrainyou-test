import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as path from 'path'
import * as commonConfig from './common.webpack'

module.exports = merge(commonConfig, {
  name: 'server',
  devtool: 'eval-source-map',
  mode: 'development',
  target: 'node',
  entry: ["@babel/polyfill", path.resolve(__dirname, '../src/ssr-middleware/index.tsx')],
  output: {
    libraryTarget: 'commonjs2',
    publicPath: '/',
    filename: 'ssr.middleware.js',
    path: path.join(process.cwd(), '.build')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ]
})
