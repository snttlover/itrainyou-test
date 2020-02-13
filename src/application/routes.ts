import { RouteComponentProps } from "@reach/router"
import * as React from "react"
import {Asd} from './pages/Asd'
import { IndexPage } from "./pages/IndexPage"

export type Route<T = any> = {
  name: string
  component: React.ComponentType<RouteComponentProps & any>
  url: string
  metadata?: T
  default?: boolean
  ssr?: boolean
  children?: Route[]
}

export const routes: Route[] = [
  {
    name: "index",
    component: IndexPage,
    url: "/",
    ssr: true
  },
  {
    name: "asd",
    component: Asd,
    url: "/asd",
  }
]
