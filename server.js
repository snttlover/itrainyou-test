// server.js
const express = require("express")
const next = require("next")
const bodyParser = require("body-parser")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())

  server.get("*", (req, res) => {
    req.url = req.url.replace(/\/$/, "")
    if (req.url === "") {
      req.url = "/"
    }
    return handle(req, res)
  })

  server.listen(process.env.PORT || 3000, err => {
    if (err) throw err
    console.log("> Read on http://localhost:3000")
  })
})
