import { clientStarted } from "#/lib/effector"
import { restoreState, runInScope } from "#/scope"
import * as React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import { history } from "#/feature/navigation"
import { Application } from "./application"

restoreState().then(scope => {
  ReactDOM.hydrate(
    <Router history={history!}>
      <Application root={scope} />
    </Router>,
    document.getElementById("root")
  )

  runInScope(clientStarted)
})

if (module.hot) {
  module.hot.accept()
}
