module.exports = api => {
  api.cache(true)
  const plugins = [
    ["styled-components", { displayName: true, ssr: true }],
  ]

  return {
    presets: ["razzle/babel"],
    plugins,
    env: {
      test: {
        plugins: [["effector/babel-plugin"]]
      }
    }
  }
}
