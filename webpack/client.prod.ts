import * as path from "path"
import * as merge from "webpack-merge"
import * as commonConfig from "./common.webpack"
const { StatsWriterPlugin } = require("webpack-stats-plugin")
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "nosources-source-map",
  output: {
    path: path.resolve(__dirname, "../.build/dist"),
    filename: "client.[hash].js",
    publicPath: "/"
  },
  entry: [
    "@babel/polyfill",
    path.resolve(__dirname, "../src/client/index.tsx")
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [new StatsWriterPlugin({ filename: '../stats.json' })]
})
