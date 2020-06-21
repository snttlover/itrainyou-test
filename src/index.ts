import express from "express"

let app = require("./server").server

if (module.hot) {
  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...")

    try {
      app = require("./server").server
    } catch (error) {
      console.error(error)
    }
  })
  console.log("✅  Server-side HMR Enabled!")
}

const port = parseInt(process.env.PORT ?? "3000", 10)

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err: Error) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`✅ Started on port ${port}`)
  })
