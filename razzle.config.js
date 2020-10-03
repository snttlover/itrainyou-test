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
  modify(baseConfig) {
    const config = Object.assign({}, baseConfig)

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
      "#": path.resolve(__dirname, "src"),
    }
    config.resolve.modules.unshift(path.resolve(__dirname, "src"))
    return config
  },
}
