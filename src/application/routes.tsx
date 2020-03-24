import { SignUpPage } from "@app/pages/auth/pages/signup/SignUpPage"
import { Redirect, RouteComponentProps, useMatch } from "@reach/router"
import { Scope } from "effector/fork"
import * as React from "react"
import { NotFoundPage } from "./pages/not-found/NotFoundPage"
import { UserPage } from "./pages/user/UserPage"
import { LandingPage } from "./pages/landing/LandingPage"
import { LoginPage } from "@/application/pages/auth/pages/login/LoginPage"
import { RecoveryPage } from "@/application/pages/auth/pages/recovery/RecoveryPage"
import { ResetPasswordPage } from "@/application/pages/auth/pages/reset-password/ResetPasswordPage"
import { SearchPage } from "@/application/pages/search/SearchPage"

export type AsyncDataOptions<T = any, Q = any> = {
  params: T
  query: Q
  scope: Scope
}

export type AsyncDataFunction = (options: AsyncDataOptions) => Promise<void>

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
    name: "login",
    component: LoginPage,
    url: "/login"
  },
  {
    name: "recovery",
    component: RecoveryPage,
    url: "/recovery"
  },
  {
    name: "reset",
    component: ResetPasswordPage,
    url: "/reset-password/:token"
  },
  {
    name: "sign-up",
    component: ({ children }) => {
      const isMatched = useMatch("/signup/:step")
      return isMatched ? children : <Redirect to='/signup/1' replace />
    },
    url: "/signup",
    children: [
      {
        name: "step",
        component: SignUpPage,
        url: "/:step"
      }
    ]
  },
  {
    name: "search",
    component: SearchPage,
    ssr: true,
    url: "/search"
  },
  {
    name: "user",
    url: "/user/:id",
    ssr: true,
    component: UserPage
  },
  {
    name: "404",
    component: NotFoundPage,
    default: true
  }
]
