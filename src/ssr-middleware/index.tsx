import {isRedirect, ServerLocation} from '@reach/router'
import { allSettled, fork, serialize } from "effector/fork"
import * as express from "express"
import * as React from "react"
import { renderToString } from "react-dom/server"
import { ServerStyleSheet } from "styled-components"
import { App } from "../application/App"
import { routes } from "../application/routes"
import { appDomain, startServer } from "../application/store"
import { matchRoutes } from "./match-routes"
import { generateDocument } from "./template"

const normalizeAssets = (assets: any) => {
  if (typeof assets === "object" && assets !== null) {
    return Object.values(assets)
  }

  return Array.isArray(assets) ? assets : [assets]
}

export const compile = (assets: string|string[]) => async (
  req: express.Request,
  res: express.Response
) => {
  const path = req.path.endsWith('/') ? req.path : `${req.path}/`
  const matchedPath = matchRoutes(path, routes)

  let styles = ""
  let content = ""
  let initialState = {}
  const scripts = normalizeAssets(assets)
    .filter(path => path.endsWith(".js"))
    .map(path => `<script src="/${path}"></script>`)
    .join("\n")

  if (matchedPath.ssr) {
    const sheet = new ServerStyleSheet()
    const scope = fork(appDomain)
    await allSettled(startServer, {
      scope,
      params: undefined
    })

    try {
      content = renderToString(
        sheet.collectStyles(
          <ServerLocation url={path}>
            <App store={scope} />
          </ServerLocation>
        )
      )
    } catch (error) {
      if (isRedirect(error)) {
        res.redirect(error.uri)
      } else {
        // carry on as usual
      }
    }
    styles = sheet.getStyleTags()
    initialState = serialize(scope)
    sheet.seal()
  }

  res.send(
    generateDocument({
      scriptsTags: scripts,
      stylesTags: styles,
      content,
      initialState
    })
  )
}
