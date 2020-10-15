const path = require("path")

module.exports = {
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: true,
        forkTsChecker: {
          tslint: false,
        },
      },
    },
  ],
  modifyBabelOptions(options, { target }) {
    if (target === "web") options.plugins.push("effector/babel-plugin")
    if (target === "node") options.plugins.push(["effector/babel-plugin", { reactSsr: true }])

    return options
  },
  modifyWebpackConfig({ webpackConfig }) {
    const config = Object.assign({}, webpackConfig)

    config.module.rules[2].exclude.push(path.resolve("src/components/icon/icons"))
    config.module.rules.push({
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
    })

    config.resolve["alias"] = {
      "@": path.resolve(__dirname, "src"),
    }
    config.resolve.modules.unshift(path.resolve(__dirname, "src"))
    return config
  },
}
