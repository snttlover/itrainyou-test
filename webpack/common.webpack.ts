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
        test: /\.(gif|png|jpg|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 16384,
              esModule: false
            }
          },
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, '../src/application/'),
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
}
