import { changeDashboardType, DashboardType } from "@/feature/dashboard/dashboard"
import { loadUserData } from "@/feature/user/user.model"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { clientStarted } from "@/lib/effector"
import { changeToken, TOKEN_COOKIE_KEY } from "@/lib/network/token"
import { restoreState, runInScope } from "@/scope"
import Cookies from "js-cookie"
import * as React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { history } from "@/feature/navigation"
import { Application } from "./application"
import * as Sentry from "@sentry/react"
import { config } from "@/config"
import { Integrations } from "@sentry/tracing"

Sentry.init({
  dsn: `${config.SENTRY_CLIENT_DSN}`,
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

const token = Cookies.get(TOKEN_COOKIE_KEY)
runInScope(changeToken, Cookies.get(TOKEN_COOKIE_KEY))
runInScope(changeDashboardType, Cookies.get("dashboard") as DashboardType)

if (token) {
  runInScope(loadUserData)

  const unwatch = getMyUserFx.finally.watch(() => {
    unwatch()

    restoreState().then(() => {
      ReactDOM.hydrate(
        <Router history={history!}>
          <Application />
        </Router>,
        document.getElementById("root")
      )

      runInScope(clientStarted)
    })
  })
} else {
  ReactDOM.render(
    <Router history={history!}>
      <Application />
    </Router>,
    document.getElementById("root")
  )

  runInScope(clientStarted)
}

if (module.hot) {
  module.hot.accept()
}
