const path = require('path');

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './admin-chats/init.ts',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./../src"),
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "plugins": [
                ["effector/babel-plugin"],
                [
                  "effector/babel-plugin",
                  {
                    "storeCreators": ["createEffectorField"],
                    "noDefaults": true
                  },
                  "createEffectorField"
                ],
                ["styled-components", {"displayName": true, "ssr": true}]
              ]
            }

          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        include: [path.resolve("src/components/icon/icons")],
        use: [
          {
            loader: require.resolve("svg-sprite-loader"),
            options: {
              symbolId: "[name]_[hash]",
              esModule: false,
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'client',
      DEBUG: false
    }),
    new HtmlWebpackPlugin({
      template: './admin-chats/index.html'
    })
  ]
}
