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

    config.resolve["alias"] = {
      "@": path.resolve(__dirname, "src"),
    }
    config.resolve.modules.unshift(path.resolve(__dirname, "src"))
    return config
  },
}
