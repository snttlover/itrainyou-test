import { RouteComponentProps } from "@reach/router"
import * as React from "react"
import { IndexPage } from "./pages/index/IndexPage"
import { NotFoundPage } from "./pages/not-found/NotFoundPage"

type RouteAsyncDataOptions<P> = {
  params: P
}

export type RouteComponent = React.ComponentType<RouteComponentProps & any> & {
  asyncData?: <P>(options: RouteAsyncDataOptions<P>) => Promise<any>
}

export type Route =
  | {
      name: string
      component: RouteComponent
      url: string
      ssr?: boolean
      default?: boolean
      children?: Route[]
    }
  | {
      name: string
      component: RouteComponent
      url?: string
      ssr?: boolean
      default: boolean
      children?: Route[]
    }

export const routes: Route[] = [
  {
    name: "index",
    component: IndexPage,
    url: "/ssr",
    ssr: true,
    children: [
      {
        name: "nest-no-ssr",
        url: "/no-ssr",
        component: IndexPage,
        ssr: false
      },
      {
        name: "nest-no-ssr",
        url: "/",
        component: IndexPage
      }
    ]
  },
  {
    name: "no-index",
    component: IndexPage,
    url: "/no-ssr"
  },
  {
    name: "404",
    component: NotFoundPage,
    default: true
  }
]
