import * as merge from 'webpack-merge'
import * as commonConfig from './ssr.common'

const config = merge.smartStrategy({
  entry: "prepend"
})(commonConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: ["@babel/polyfill/noConflict"]
})

module.exports = config
