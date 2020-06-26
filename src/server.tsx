import { $lastUrlServerNavigation } from "@/feature/navigation"
import { $token, changeToken, TOKEN_COOKIE_KEY } from "@/feature/user/user.model"
import { performance } from "perf_hooks"
import express from "express"
import serialize from "serialize-javascript"

import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { matchRoutes, MatchedRoute } from "react-router-config"
import { ServerStyleSheet } from "styled-components"
import cookieParser from "cookie-parser"

import { fork, serialize as effectorSerialize, allSettled } from "effector/fork"
import { root, Event, forward, guard, sample } from "effector-root"
import { config } from "./config"

import { getStart, START } from "./lib/effector"
import { Application } from "./application"
import { ROUTES } from "./pages/routes"

const serverStarted = root.createEvent<{
  req: express.Request
  res: express.Response
}>()

const requestHandled = serverStarted.map(({ req }) => req)

const tokenCookie = requestHandled.map(req => req.cookies[TOKEN_COOKIE_KEY] as string)

guard({
  source: tokenCookie,
  filter: token => !!token,
  target: changeToken,
})

const routesMatched = requestHandled.map(req => ({
  query: req.query as Record<string, string>,
  routes: matchRoutes(ROUTES, req.url.split("?")[0]).filter(lookupStartEvent).filter(Boolean),
}))

for (const { component } of ROUTES) {
  const startPageEvent = getStart(component)

  if (!startPageEvent) continue

  const matchedRoute = routesMatched.filterMap(({ routes, query }) => {
    const filteredRoutes = routes.filter(route => lookupStartEvent(route) === startPageEvent)

    return filteredRoutes.length > 0
      ? {
          route: filteredRoutes[0],
          query,
        }
      : undefined
  })

  forward({
    from: matchedRoute.map(({ query, route }) => ({ query, params: route?.match?.params })),
    to: startPageEvent,
  })
}

sample({
  source: serverStarted,
  clock: $lastUrlServerNavigation,
  fn: ({ res }, url) => ({ res, url }),
}).watch(({ res, url }) => res.redirect(url))

let assets: {
  client: {
    css: string
    js: string
  }
}

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)
}
syncLoadAssets()

export const server = express()
  .disable("x-powered-by")
  .use(cookieParser())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    console.info("[REQUEST] %s %s", req.method, req.url)
    const timeStart = performance.now()

    const currentRoutes = matchRoutes(ROUTES, req.url.split("?")[0])
    const isSSR = currentRoutes.reduce((_, route) => route.route.ssr, false)
    if (isSSR) {
      const scope = fork(root)

      try {
        await allSettled(serverStarted, {
          scope,
          params: { req, res },
        })
      } catch (error) {
        console.log(error)
      }

      if (res.statusCode >= 300 && res.statusCode < 400) {
        console.info(
          "[REDIRECT] from %s to %s at %sms",
          req.url,
          res.get("Location"),
          (performance.now() - timeStart).toFixed(2)
        )
        return
      }

      const context = {}
      const sheet = new ServerStyleSheet()

      const jsx = sheet.collectStyles(
        <StaticRouter context={context} location={req.url}>
          <Application root={scope} />
        </StaticRouter>
      )

      const stream = sheet.interleaveWithNodeStream(ReactDOMServer.renderToNodeStream(jsx))
      const storesValues = effectorSerialize(scope, { ignore: [$token] })

      res.write(htmlStart(assets.client.css, assets.client.js))
      stream.pipe(res, { end: false })
      stream.on("end", () => {
        res.end(htmlEnd(storesValues))
        sheet.seal()
        console.info("[PERF] sent page at %sms", (performance.now() - timeStart).toFixed(2))
      })
    } else {
      res.write(htmlStart(assets.client.css, assets.client.js))
      res.end(htmlEnd({}))
      console.info("[PERF] sent page at %sms", (performance.now() - timeStart).toFixed(2))
    }
  })

function htmlStart(assetsCss: string, assetsJs: string) {
  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Itrainyou</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assetsCss ? `<link rel="stylesheet" href="${assetsCss}">` : ""}
        <script>window.env = ${serialize(config)};</script>
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assetsJs}" defer></script>`
            : `<script src="${assetsJs}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">`
}

function htmlEnd(storesValues: {}): string {
  return `</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(storesValues)}
        </script>
    </body>
</html>`
}

function lookupStartEvent<P, E>(match: MatchedRoute<P>): Event<E> | undefined {
  if (match.route.component) {
    return match.route.component[START]
  }
  return undefined
}
