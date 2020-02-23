import {allSettled, fork} from 'effector/fork'
import * as React from "react"
import { hydrate } from "react-dom"
import { App } from "../application/App"
import {appDomain, startClient} from '../application/store'

declare global {
  interface Window {
    __initialState__: any
  }
}

const initialState = window.__initialState__

const clientScope = fork(appDomain, {
  values: initialState
})

allSettled(startClient, {
  scope: clientScope,
  params: undefined,
}).then(() => {
  hydrate(<App store={clientScope} />, document.getElementById("root"))
})
