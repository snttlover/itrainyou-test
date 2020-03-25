import * as webpack from "webpack"
import * as merge from "webpack-merge"
import * as path from "path"
import * as commonConfig from "../common.webpack"

const config = merge.smartStrategy({
  entry: "prepend"
})(commonConfig, {
  name: "server",
  target: "node",
  entry: [path.resolve(__dirname, "../../src/ssr-middleware/index.tsx")],
  output: {
    libraryTarget: "commonjs2",
    publicPath: "/",
    filename: "ssr.middleware.js",
    path: path.join(process.cwd(), ".build")
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|svg)(\?.*$|$)/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "file-loader",
            options: {
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      "process.isServer": JSON.stringify(true)
    })
  ]
})

module.exports = config
