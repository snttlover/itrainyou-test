import * as merge from "webpack-merge"
import * as commonConfig from "./client.common"
const { StatsWriterPlugin } = require("webpack-stats-plugin")
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge.smartStrategy({
  entry: 'prepend'
})(commonConfig, {
  mode: "production",
  devtool: "nosources-source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [new StatsWriterPlugin({ filename: '../stats.json' })]
})
