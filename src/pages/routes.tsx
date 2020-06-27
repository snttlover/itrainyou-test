import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { LoginPage } from "@/pages/auth/pages/login/LoginPage"
import { SignUpPage } from "@/pages/auth/pages/signup/SignUpPage"
import HomePage from "@/pages/client/home/HomePage"
import ProfilePage from "@/pages/client/profile/ProfilePage"
import CoachHome from "@/pages/coach/home/CoachHome"
import CoachWalletPage from "@/pages/coach/wallet/CoachWalletPage"
import SettingsPage from "@/pages/common/settings/SettingsPage"
import { routeNames } from "@/pages/route-names"
import { CoachByIdPage } from "@/pages/search/coach-by-id/CoachByIdPage"
import * as React from "react"
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
    component: CoachHome,
  },
  {
    path: routeNames.coachSettings(),
    exact: true,
    component: () => (
      <CoachDashboardLayout>
        <SettingsPage />
      </CoachDashboardLayout>
    ),
  },
  {
    path: routeNames.coachWallet(),
    exact: true,
    component: CoachWalletPage,
  },
  {
    path: "*",
    render: () => <div>not found</div>,
  },
]
