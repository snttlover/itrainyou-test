import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import * as path from "path"
import { HotModuleReplacementPlugin } from "webpack"

module.exports = {
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
      },
      {
        test: /\.(js|jsx)$/,
        use: "react-hot-loader/webpack",
        include: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new HotModuleReplacementPlugin(), new ForkTsCheckerWebpackPlugin()]
}
