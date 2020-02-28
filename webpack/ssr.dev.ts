import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import * as webpack from "webpack"
import * as path from "path"

const config: webpack.Configuration = {
  name: "server",
  devtool: "eval-source-map",
  mode: "development",
  target: "node",
  entry: ["@babel/polyfill/noConflict", path.resolve(__dirname, "../src/ssr-middleware/index.tsx")],
  output: {
    libraryTarget: "commonjs2",
    publicPath: "/",
    filename: "ssr.middleware.js",
    path: path.join(process.cwd(), ".build")
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
    alias: {
      '@': path.resolve(__dirname, '../src/')
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new ForkTsCheckerWebpackPlugin()
  ]
}

module.exports = config
