const path = require('path')
const withImages = require('next-images')
module.exports = withImages({
  env: {
    BACKEND_URL: ''
  },
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    config.resolve.alias['@app'] = path.join(__dirname, 'src')
    return config
  }
})
