import { Application } from "@/client/Application"
import { createHistory } from "@reach/router"
import { allSettled, fork, hydrate } from "effector/fork"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { appDomain, startClient } from "@/application/store"

declare global {
  interface Window {
    __initialState__: any
  }
}

const initialState = window.__initialState__

const clientScope = fork(appDomain)
// @ts-ignore
const history = createHistory(window)

let render = ReactDOM.render

if (initialState) {
  hydrate(appDomain, {
    values: initialState
  })
  render = ReactDOM.hydrate
}
render(<Application scope={clientScope} history={history} />, document.getElementById("root"))

allSettled(startClient, {
  scope: clientScope,
  params: undefined
})
