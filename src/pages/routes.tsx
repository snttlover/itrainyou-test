import React from "react"
import { RouteConfig } from "react-router-config"
import { LoginPage } from "@/pages/auth/pages/login/LoginPage"
import { SignUpPage } from "@/pages/auth/pages/signup/SignUpPage"
import { LandingPage } from "./landing/LandingPage"
import { SearchPage } from "./search/SearchPage"

export const routeNames = {
  landing: () => `/`,
  search: () => `/search`,
  login: () => `/auth/login`,
  signup: (step: string) => `/auth/signup/${step}`,
  client: () => `/client`,
  coach: () => `/coach`,
}

export const ROUTES: RouteConfig[] = [
  {
    path: routeNames.landing(),
    exact: true,
    component: LandingPage,
  },
  {
    path: routeNames.search(),
    component: SearchPage,
  },
  {
    path: routeNames.login(),
    component: LoginPage,
  },
  {
    path: routeNames.signup(":step"),
    component: SignUpPage,
  },
  {
    path: "*",
    render: () => <div>not found</div>,
  },
]
