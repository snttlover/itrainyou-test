import "@/shared/polyfills"
import { bootstrapApplication } from "@/app/bootstrap"
import { fixDuplicateTokenCookie } from "@/app/fix/duplicate-token-cookie"

import { DashboardType } from "@/feature/dashboard/dashboard"
import { loadUserData } from "@/feature/user/user.model"
import { clientStarted } from "@/lib/effector"
import { runInScope } from "@/scope"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"
import { root } from "effector-root"
import { hydrate } from "effector/fork"
import Cookies from "js-cookie"
import * as React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { history } from "@/feature/navigation"
import { Application } from "./app/application"
import * as Sentry from "@sentry/react"
import { config } from "@/config"
import { Integrations } from "@sentry/tracing"
import { enableDebugger } from "@/lib/effector/debug"
import { sessionToken } from "@/feature/user/session-token"

fixDuplicateTokenCookie()

if (config.ENVIRONMENT !== "local") {
  Sentry.init({
    dsn: `${config.SENTRY_CLIENT_DSN}`,
    integrations: [new Integrations.BrowserTracing()],
    ignoreErrors: [
      "Received `true` for a non-boolean attribute `active`",
      "ResizeObserver loop limit exceeded",
      `${config.BACKEND_URL}/api/v1/web/clients/`,
      "canvas.contentDocument",
    ],
    debug: false,
    sampleRate: 1.0,
    tracesSampleRate: 1.0,
  })
}

if (config.ENVIRONMENT === "local" && config.DEBUG === "1") {
  enableDebugger()
}

const token = sessionToken.get()

bootstrapApplication({
  activeDashboardType: Cookies.get("dashboard") as DashboardType,
  backendUrl: config.BACKEND_URL,
  token
})

hydrate(root, { values: window.INITIAL_STATE })

const render = () => {
  const renderMethod = !token ? ReactDOM.render : ReactDOM.hydrate

  renderMethod(
    <Router history={history!}>
      <Application />
    </Router>,
    document.getElementById("root")
  )

  clientStarted()
}

if (token) {
  // TODO: rework
  runInScope(loadUserData)

  const unwatch = getMyUserApiFx.fx.finally.watch(() => {
    unwatch()

    render()
  })
} else {
  render()
}

if (module.hot) {
  module.hot.accept()
}
