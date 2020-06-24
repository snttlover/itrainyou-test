import HomePage from "@/pages/client/home/HomePage"
import { CoachByIdPage } from "@/pages/search/coach-by-id/CoachByIdPage"
import React from "react"
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from "react-router-config"
import { LoginPage } from "@/pages/auth/pages/login/LoginPage"
import { SignUpPage } from "@/pages/auth/pages/signup/SignUpPage"
import { LandingPage } from "./landing/LandingPage"
import { SearchPage } from "./search/SearchPage"

export const routeNames = {
  landing: () => `/`,
  search: () => `/search`,
  searchCoachPage: (id: string) => `/search/coach/${id}`,
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
    path: routeNames.searchCoachPage(":id"),
    component: CoachByIdPage,
  },
  {
    path: routeNames.search(),
    exact: true,
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
    path: routeNames.client(),
    render: ({ route }) => <>{renderRoutes(route?.routes)}</>,
    routes: [
      {
        path: "/",
        component: HomePage,
      },
    ],
  },
  {
    path: routeNames.coach(),
    render: ({ route }: RouteConfigComponentProps) => <>{renderRoutes(route?.routes)}</>,
    routes: [],
  },
  {
    path: "*",
    render: () => <div>not found</div>,
  },
]
