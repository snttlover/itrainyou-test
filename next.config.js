const path = require("path")
const withImages = require("next-optimized-images")
const { withEffectoReactAliases } = require("effector-next/tools")

const enhance = withEffectoReactAliases()

module.exports = enhance(
  withImages({
    optimizeImagesInDev: true,
    env: {
      BACKEND_URL: process.env.BACKEND_URL || "https://dev.itrainyou.heksray.com"
    },
    webpack(config, options) {
      config.resolve.alias["@"] = path.join(__dirname, "src")
      config.resolve.alias["@app"] = path.join(__dirname, "src")
      return config
    }
  })
)
