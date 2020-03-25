import * as merge from "webpack-merge"
import * as path from "path"
import * as commonConfig from "../common.webpack"

module.exports = merge.smartStrategy({
  entry: "prepend"
})(commonConfig, {
  output: {
    path: path.resolve(__dirname, "../../.build/dist"),
    filename: "client.[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/client/index.tsx")],
})
