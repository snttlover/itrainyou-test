import { Provider } from "effector-react/ssr"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { fork, hydrate } from "effector/fork"

import { root } from "effector-root"
import { Application } from "./application"

hydrate(root, { values: window.INITIAL_STATE })

const scope = fork(root)

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider value={scope}>
      <Application />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
