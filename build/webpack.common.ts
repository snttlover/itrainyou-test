import * as path from "path"
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

module.exports = {
  entry: path.resolve(__dirname, "../src/client/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../../dist"),
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
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } } // or whatever your project requires
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ],
            plugins: [
              "react-hot-loader/babel"
            ]
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
