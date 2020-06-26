import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { LoginPage } from "@/pages/auth/pages/login/LoginPage"
import { SignUpPage } from "@/pages/auth/pages/signup/SignUpPage"
import HomePage from "@/pages/client/home/HomePage"
import ProfilePage from "@/pages/client/profile/ProfilePage"
import SettingsPage from "@/pages/common/settings/SettingsPage"
import { routeNames } from "@/pages/route-names"
import { CoachByIdPage } from "@/pages/search/coach-by-id/CoachByIdPage"
import React from "react"
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from "react-router-config"
import { LandingPage } from "./landing/LandingPage"
import { SearchPage } from "./search/SearchPage"

export const ROUTES: RouteConfig[] = [
  {
    path: routeNames.landing(),
    exact: true,
    component: LandingPage,
    ssr: true,
  },
  {
    path: routeNames.searchCoachPage(":id"),
    component: CoachByIdPage,
    ssr: true,
  },
  {
    path: routeNames.search(),
    exact: true,
    component: SearchPage,
    ssr: true,
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
    exact: true,
    component: HomePage,
  },
  {
    path: routeNames.clientProfile(),
    component: ProfilePage,
  },
  {
    path: routeNames.clientSettings(),
    component: () => (
      <ClientDashboardLayout>
        <SettingsPage />
      </ClientDashboardLayout>
    ),
  },
  {
    path: routeNames.coach(),
    exact: true,
  },
  {
    path: "*",
    render: () => <div>not found</div>,
  },
]
