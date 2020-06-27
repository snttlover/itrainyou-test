import { clientStarted } from "@/lib/effector"
import { changeToken, TOKEN_COOKIE_KEY } from "@/lib/network/token"
import Cookies from "js-cookie"
import * as React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { allSettled, fork, hydrate } from "effector/fork"

import { root } from "effector-root"
import { history } from "@/feature/navigation"
import { Application } from "./application"

const restoreState = async () => {
  hydrate(root, { values: window.INITIAL_STATE })
  const scope = fork(root)

  await allSettled(changeToken, { scope, params: Cookies.get(TOKEN_COOKIE_KEY) })

  return scope
}

restoreState().then(scope => {
  ReactDOM.hydrate(
    <Router history={history!}>
      <Application root={scope} />
    </Router>,
    document.getElementById("root")
  )

  allSettled(clientStarted, { scope, params: undefined })
})

if (module.hot) {
  module.hot.accept()
}
