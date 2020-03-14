import * as merge from "webpack-merge"
import * as commonConfig from "./ssr.common"
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge.smartStrategy({ entry: "prepend" })(commonConfig, {
  devtool: "source-map",
  mode: "production",
  entry: ["@babel/polyfill"],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
})
