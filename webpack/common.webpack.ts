import * as path from "path"
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

module.exports = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
}
