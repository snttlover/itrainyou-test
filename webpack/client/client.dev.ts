import * as merge from 'webpack-merge'
import * as commonConfig from './client.common'
import { HotModuleReplacementPlugin } from "webpack"

module.exports = merge.smartStrategy({
  entry: 'prepend'
})(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  entry: [
    "webpack-hot-middleware/client",
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "react-hot-loader/webpack",
        include: /node_modules/
      }
    ]
  },
  plugins: [new HotModuleReplacementPlugin()]
})
