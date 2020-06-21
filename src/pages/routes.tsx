import React from "react"
import { LandingPage } from "./landing/LandingPage"
import SearchPage from "./search/SearchPage"

export const ROUTES = [
  {
    path: "/",
    exact: true,
    component: LandingPage,
  },
  {
    path: "/search",
    exact: true,
    component: SearchPage,
  },
]
