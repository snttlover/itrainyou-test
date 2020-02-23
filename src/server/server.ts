import * as express from "express"
import * as path from 'path'
import * as serveStatic from 'serve-static'

const app = express()

app.use(serveStatic(path.resolve(process.cwd(), 'public')))

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack")
  const webpackDevMiddleware = require("webpack-dev-middleware")
  const webpackHotMiddleware = require("webpack-hot-middleware")
  const config = require("../../webpack/client.dev")
  const ssrConfig = require("../../webpack/ssr.dev")

  const compiler = webpack(config)
  const ssrCompiler = webpack(ssrConfig)

  app.use(webpackDevMiddleware(compiler, { serverSideRender: true }))
  app.use(webpackDevMiddleware(ssrCompiler, { writeToDisk: true }))
  app.use(webpackHotMiddleware(compiler))

  app.use((req: express.Request, res: express.Response) => {
    const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName.main
    const ssrMiddlewarePath = path.resolve(process.cwd(), '.build/ssr.middleware.js')
    delete require.cache[require.resolve(ssrMiddlewarePath)]
    const { compile } = require(ssrMiddlewarePath)
    compile(assetsByChunkName)(req, res)
  })
} else {
  const { compile } = require("./ssr.middleware.js")
  const assets = {} // TODO: Load assets in production from stats.json
  app.use(compile(assets))
}

const port = process.env.PORT || "3000"
const host = process.env.HOST || "0.0.0.0"

app.listen(parseInt(port), host, () => {
  console.log(`Listen ${host}:${port}`)
})
