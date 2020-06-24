import { clientStarted } from "@/lib/effector"
import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { allSettled, fork, hydrate } from "effector/fork"

import { root } from "effector-root"
import { history } from "@/feature/navigation"
import { Application } from "./application"

hydrate(root, { values: window.INITIAL_STATE })
const scope = fork(root)

ReactDOM.hydrate(
  <Router history={history!}>
    <Application root={scope} />
  </Router>,
  document.getElementById("root")
)

allSettled(clientStarted, { scope, params: undefined })

if (module.hot) {
  module.hot.accept()
}
