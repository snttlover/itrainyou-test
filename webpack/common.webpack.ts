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
      },
      {
        test: /\.(png|gif|jpeg|jpg|svg)?$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 16384,
              esModule: false
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
}
