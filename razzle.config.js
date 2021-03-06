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
    const commonEffectorBabelPluginOptions = {
      factories: [
        "@/lib/generators/efffector",
        "@/shared/api/common/request",
      ],
    }

    if (target === "web") options.plugins.push(["effector/babel-plugin", commonEffectorBabelPluginOptions])
    if (target === "node") options.plugins.push(["effector/babel-plugin", { ...commonEffectorBabelPluginOptions, reactSsr: true }])

    return options
  },
  modifyWebpackConfig({ webpackConfig }) {
    const config = Object.assign({}, webpackConfig)

    config.module.rules[2].exclude.push(path.resolve("src/old-components/icon/icons"))
    config.module.rules.push({
      test: /\.svg$/,
      include: [path.resolve("src/old-components/icon/icons")],
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
  modifyJestConfig({ jestConfig }) {
    jestConfig.moduleNameMapper["^@/(.*)$"] = "<rootDir>/src/$1"

    return jestConfig
  }
}
