import { $lastUrlServerNavigation } from "@/feature/navigation"
import { $token, logout, TOKEN_COOKIE_KEY } from "@/lib/network/token"
import { Provider } from "effector-react/ssr"
import express from "express"
import * as Sentry from "@sentry/node"
import serialize from "serialize-javascript"
import { performance } from "perf_hooks"

import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { matchRoutes, MatchedRoute } from "react-router-config"
import { ServerStyleSheet } from "styled-components"
import cookieParser from "cookie-parser"

import { fork, serialize as effectorSerialize, allSettled } from "effector/fork"
import { root, Event, forward, sample } from "effector-root"
import { config } from "./config"

import { getStart, START } from "./lib/effector"
import { Application } from "./application"
import { ROUTES } from "./pages/routes"
import { fixChrome88timeZone } from "@/polyfills/chrome88-dayjs-timezone-fix"

fixChrome88timeZone()

Sentry.init({
  dsn: `${config.SENTRY_SERVER_DSN}`,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

const serverStarted = root.createEvent<{
  req: express.Request
  res: express.Response
  isSSR: boolean
}>()

const requestHandled = serverStarted.map(({ req, isSSR }) => ({ req, isSSR }))

const routesMatched = requestHandled.map(({ req, isSSR }) => ({
  query: req.query as Record<string, string>,
  routes: isSSR ? matchRoutes(ROUTES, req.url.split("?")[0]).filter(lookupStartEvent).filter(Boolean) : [],
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

sample({
  source: serverStarted,
  clock: logout,
  fn: ({ res }) => ({ res }),
}).watch(({ res }) => res.clearCookie(TOKEN_COOKIE_KEY))

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

const generateSSRPage = async (req: express.Request, res: express.Response) => {
  const scope = fork(root)

  try {
    const t1 = performance.now()
    await allSettled(serverStarted, {
      scope,
      params: { req, res, isSSR: true },
    })
    const t2 = performance.now()
    console.log(`Load data from backend: ${t2 - t1}ms`)
  } catch (error) {
    console.log(error)
  }

  if (res.statusCode >= 300 && res.statusCode < 400) {
    return
  }

  const context = {}
  const sheet = new ServerStyleSheet()

  const jsx = sheet.collectStyles(
    <StaticRouter context={context} location={req.url}>
      <Provider value={scope}>
        <Application />
      </Provider>
    </StaticRouter>
  )

  const storesValues = effectorSerialize(scope, { ignore: [$token], onlyChanges: true })
  const html = ReactDOMServer.renderToString(jsx)
  const css = sheet.getStyleTags()

  const generatedPage = `${htmlStart(assets.client.css, assets.client.js, css)}${html}${htmlEnd(storesValues)}`
  sheet.seal()
  return generatedPage
}

// ToDo: супер простая реализация кеша, переделать на middleware + redis
const cache = {}
const CACHE_TIMEOUT = 5 * 60

const cacheGet = (key: string) => {
  if((cache[key])) {
    const isFresh = Math.round((Date.now() - cache[key].setDatetime) / 1000) < CACHE_TIMEOUT

    if (isFresh) return cache[key].value
  }
}

const cacheSet = (key: string, value: string) => {
  cache[key] = {
    value,
    setDatetime: Date.now()
  }
}

const ROUTES_TO_CACHE = ["/"]

export const server = express()
  .disable("x-powered-by")
  .use(Sentry.Handlers.requestHandler())
  .use(cookieParser())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    const tStart = performance.now()
    const currentRoutes = matchRoutes(ROUTES, req.url.split("?")[0])
    const isSSR = currentRoutes.reduce((_, route) => route.route.ssr, false)
    const hasCookie = !!req.cookies[TOKEN_COOKIE_KEY]

    if (isSSR && !hasCookie) {
      if ((ROUTES_TO_CACHE.includes(req.url)) && (cacheGet(req.url))) {
        console.log("Reading from cache")
        res.end(cacheGet(req.url))
      } else {

        let generatedPage
        try {
          generatedPage = await generateSSRPage(req, res)
        } catch (error) {
          console.log(error)
          res.end()
          return
        }

        if (ROUTES_TO_CACHE.includes(req.url)) {
          console.log(`Settings cache for ${req.url}`)
          cacheSet(req.url, generatedPage!)
        }

        res.end(generatedPage)
      }
    } else {
      res.write(htmlStart(assets.client.css, assets.client.js, ""))
      res.end(htmlEnd({}))
    }

    const tEnd = performance.now()
    console.log(`Request done by ${tEnd - tStart}ms`)
  })
  .use(Sentry.Handlers.errorHandler())

function getGoogleAnalyticsTags() {
  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-B664BMTWRH"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-B664BMTWRH');
    </script>
  `
}

function htmlStart(assetsCss: string, assetsJs: string, css: string) {
  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Itrainyou</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">     
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,500,600|Roboto:300,400,500,700,900&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet">
        ${ config.ENVIRONMENT === "production" ? getGoogleAnalyticsTags() : ""}  
        ${assetsCss ? `<link rel="stylesheet" href="${assetsCss}">` : ""}
        <script>window.env = ${serialize(config)};</script>
        ${
  process.env.NODE_ENV === "production"
    ? `<script src="${assetsJs}" defer></script>`
    : `<script src="${assetsJs}" defer crossorigin></script>`
}
        ${css}
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