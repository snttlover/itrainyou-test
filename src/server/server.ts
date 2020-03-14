import * as express from "express"
import { statSync } from "fs"
import * as path from 'path'
import * as serveStatic from 'serve-static'

const app = express()

app.use(serveStatic(path.resolve(process.cwd(), 'public')))

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack")
  const webpackDevMiddleware = require("webpack-dev-middleware")
  const webpackHotMiddleware = require("webpack-hot-middleware")
  const config = require("../../webpack/client/client.dev")
  const ssrConfig = require("../../webpack/ssr/ssr.dev")

  const compiler = webpack(config)
  const ssrCompiler = webpack(ssrConfig)

  app.use(webpackDevMiddleware(compiler, { serverSideRender: true }))
  app.use(webpackDevMiddleware(ssrCompiler, { writeToDisk: true }))
  app.use(webpackHotMiddleware(compiler))

  let prevMStatsMS: number = -1
  let compile: any = () => () => {}

  app.use((req: express.Request, res: express.Response) => {
    const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName.main
    const ssrMiddlewarePath = path.resolve(process.cwd(), '.build/ssr.middleware.js')
    const stats = statSync(ssrMiddlewarePath)
    if (stats.mtimeMs !== prevMStatsMS) {
      delete require.cache[require.resolve(ssrMiddlewarePath)]
      compile = require(ssrMiddlewarePath).compile
      prevMStatsMS = stats.mtimeMs
    }
    compile(assetsByChunkName)(req, res)
  })
} else {
  app.use(serveStatic(path.resolve(__dirname, 'dist')))
  const { assetsByChunkName } = require("./stats.json")
  const { compile } = require("./ssr.middleware.js")
  app.use(compile(assetsByChunkName.main))
}

const port = process.env.PORT || "3000"
const host = process.env.HOST || "0.0.0.0"

app.listen(parseInt(port), host, () => {
  console.log(`Listen ${host}:${port}`)
})
