const path = require("path")
const withImages = require("next-optimized-images")
const { withEffectoReactAliases } = require("effector-next/tools")

const enhance = withEffectoReactAliases()

module.exports = enhance(
  withImages({
    optimizeImagesInDev: true,
    env: {
      BACKEND_URL: ""
    },
    webpack(config, options) {
      config.resolve.alias["@"] = path.join(__dirname, "src")
      config.resolve.alias["@app"] = path.join(__dirname, "src")
      return config
    }
  })
)
