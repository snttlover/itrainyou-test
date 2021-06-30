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

const port = parseInt(process.env[["PORT"][0]] ?? "3000", 10)
const host = process.env[["HOST"][0]] || "127.0.0.1"

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, host, (err: Error) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`✅  Started on port http://${host}:${port}`)
  })
