import {ServerLocation} from '@reach/router'
import * as express from 'express'
import * as React from 'react'
import {renderToString} from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import {App} from '../application/App'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../../build/webpack.development')

  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {serverSideRender: true}))

  app.use(webpackHotMiddleware(compiler))

  const normalizeAssets = (assets: any) => {
    if (typeof assets === 'object' && assets !== null) {
      return Object.values(assets);
    }

    return Array.isArray(assets) ? assets : [assets];
  }

  app.get('/', (req, res) => {
    const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
    const fs = res.locals.fs;
    const outputPath = res.locals.webpackStats.toJson().outputPath;

    const scripts = normalizeAssets(assetsByChunkName.main)
      .filter((path) => path.endsWith('.js'))
      .map((path) => `<script src="${path}"></script>`)
      .join('\n')

    const sheet = new ServerStyleSheet()
    const markup = renderToString(sheet.collectStyles(<ServerLocation url={req.url}><App /></ServerLocation>))

    res.send(`
      <html lang="ru">
        <head>
          <title>ITrainYou</title>
          ${sheet.getStyleTags()}
        </head>
        <body>
          <div id="root">${markup}</div>
          ${scripts}
        </body>
      </html>  
    `)
    sheet.seal()
  })
}

const port = process.env.PORT || "3000"
const host = process.env.HOST || "0.0.0.0"

app.listen(parseInt(port), host, () => {
  console.log(`Listen ${host}:${port}`)
})
