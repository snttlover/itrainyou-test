import { RouteComponentProps } from "@reach/router"
import { Scope } from "effector/fork"
import * as React from "react"
import { NotFoundPage } from "./pages/not-found/NotFoundPage"
import { UserPage } from "./pages/user/UserPage"
import { LandingPage } from "./pages/landing/LandingPage"

export type AsyncDataOptions<T = any> = {
  params: T,
  scope: Scope
}

export type AsyncDataFunction = (options: AsyncDataOptions) => Promise<never>

export type RouteComponent = React.ComponentType<RouteComponentProps & any> & { asyncData?: AsyncDataFunction }

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
    name: "landing",
    component: LandingPage,
    ssr: true,
    url: "/"
  },
  {
    name: 'user',
    url: "/user/:id",
    ssr: true,
    component: UserPage
  },
  {
    name: "404",
    component: NotFoundPage,
    default: true
  },
]
