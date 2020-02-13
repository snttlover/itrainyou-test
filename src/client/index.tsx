import * as React from "react"
import { hydrate } from "react-dom"
import { App } from "../application/App"

hydrate(<App />, document.getElementById("root"))
