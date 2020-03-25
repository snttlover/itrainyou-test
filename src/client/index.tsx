import { Application } from "@/client/Application"
import { createHistory } from "@reach/router"
import { fork, hydrate } from "effector/fork"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { appDomain } from "@/application/store"

const initialState = window.__initialState__

// @ts-ignore
export const history = createHistory(window)

let render = ReactDOM.render

if (initialState) {
  hydrate(appDomain, {
    values: initialState
  })
  render = ReactDOM.hydrate
}

const clientScope = fork(appDomain)

render(<Application scope={clientScope} history={history} />, document.getElementById("root"))
