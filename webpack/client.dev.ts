import * as path from "path"
import * as merge from "webpack-merge"
import { HotModuleReplacementPlugin } from "webpack"
import * as commonConfig from "./common.webpack"

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "../.build/dist"),
    filename: "client.[hash].js",
    publicPath: "/"
  },
  entry: [
    "webpack-hot-middleware/client",
    "@babel/polyfill",
    path.resolve(__dirname, "../src/client/index.tsx")
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
