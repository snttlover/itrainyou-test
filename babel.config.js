module.exports = api => {
  api.cache(true)
  const plugins = [
    [
      "effector/babel-plugin",
      {
        storeCreators: ["createEffectorField"],
        noDefaults: true,
      },
      "createEffectorField",
    ],
    ["styled-components", { displayName: true, ssr: true }],
  ]

  return {
    presets: ["razzle/babel"],
    plugins,
  }
}
