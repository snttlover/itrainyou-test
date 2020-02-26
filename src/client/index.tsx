import { allSettled, fork, hydrate } from 'effector/fork'
import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "../application/App"
import {appDomain, startClient} from '../application/store'

declare global {
  interface Window {
    __initialState__: any
  }
}

const initialState = window.__initialState__

hydrate(appDomain, {
  values: initialState
})

const clientScope = fork(appDomain)

allSettled(startClient, {
  scope: clientScope,
  params: undefined,
}).then(() => {
  ReactDOM.hydrate(<App store={clientScope} />, document.getElementById("root"))
})
