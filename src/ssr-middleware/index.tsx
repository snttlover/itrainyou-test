import { isRedirect, ServerLocation } from "@reach/router"
import { Provider } from "effector-react/ssr"
import { allSettled, fork, serialize } from "effector/fork"
import * as express from "express"
import * as querystring from "querystring"
import * as React from "react"
import { renderToString } from "react-dom/server"
import Helmet, { HelmetData } from "react-helmet"
import { ServerStyleSheet } from "styled-components"
import { App } from "@/application/App"
import { AsyncDataFunction, routes } from "@/application/routes"
import { appDomain, startServer } from "@/application/store"
import { matchRoutes } from "@app/match-routes"
import { generateDocument } from "./template"

const normalizeAssets = (assets: any) => {
  if (typeof assets === "object" && assets !== null) {
    return Object.values(assets)
  }

  return Array.isArray(assets) ? assets : [assets]
}

const isAsyncDataExists = (
  asyncData: AsyncDataFunction | undefined
): asyncData is AsyncDataFunction => {
  return !!asyncData
}

export const compile = (assets: string | string[]) => async (
  req: express.Request,
  res: express.Response
) => {
  const path = req.path.endsWith("/") ? req.path : `${req.path}/`
  const matchedPath = matchRoutes(path, routes, querystring.unescape)

  let styles = ""
  let content = ""
  let helmet: HelmetData = Helmet.renderStatic()
  let initialState = {}
  const scripts = normalizeAssets(assets)
    .filter(path => path.endsWith(".js"))
    .map(path => `<script src="/${path}"></script>`)
    .join("\n")

  if (matchedPath.ssr) {
    const sheet = new ServerStyleSheet()
    const scope = fork(appDomain)

    try {
      const asyncDataFunctions: AsyncDataFunction[] = matchedPath.components
        .map(component => component.asyncData)
        .filter(isAsyncDataExists)

      for (const asyncDataFunction of asyncDataFunctions) {
        await asyncDataFunction({ params: matchedPath.params, scope, query: req.query })
      }
      await allSettled(startServer, {
        scope,
        params: undefined
      })
      initialState = serialize(scope)

      content = renderToString(
        sheet.collectStyles(
          <ServerLocation url={path}>
            <Provider value={scope}>
              <App />
            </Provider>
          </ServerLocation>
        )
      )
      helmet = Helmet.renderStatic()
    } catch (error) {
      if (isRedirect(error)) {
        res.redirect(error.uri)
      } else {
        // carry on as usual
      }
    }
    styles = sheet.getStyleTags()
    sheet.seal()
  }

  res.send(
    generateDocument({
      scriptsTags: scripts,
      stylesTags: styles,
      helmet,
      content,
      initialState
    })
  )
}
