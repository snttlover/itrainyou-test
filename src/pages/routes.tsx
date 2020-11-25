import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { LoginPage } from "@/pages/auth/pages/login/LoginPage"
import RecoveryPage from "@/pages/auth/pages/recovery/RecoveryPage"
import { ResetPasswordPage } from "@/pages/auth/pages/reset-password/ResetPasswordPage"
import { SignUpPage } from "@/pages/auth/pages/signup/SignUpPage"
import HomePage from "@/pages/client/home/HomePage"
import ProfilePage from "@/pages/client/profile/ProfilePage"
import { ClientWalletPage } from "@/pages/client/wallet/ClientWalletPage"
import CoachBlockedPage from "@/pages/coach/blocked/CoachBlockedPage"
import { ClientPage } from "@/pages/coach/client/ClientPage"
import CoachClientsPage from "@/pages/coach/clients/CoachClientsPage"
import CoachHome from "@/pages/coach/home/CoachHome"
import { CoachProfileEditPage } from "@/pages/coach/profile/edit-page/CoachProfileEditPage"
import { CoachProfilePage } from "@/pages/coach/profile/profile-page/CoachProfilePage"
import { CoachSessionsHistory } from "@/pages/coach/profile/session-history/CoachSessionsHistory"
import CoachSchedulePage from "@/pages/coach/schedule/CoachSchedulePage"
import CoachSupportPage from "@/pages/coach/support/CoachSupportPage"
import ClientSupportPage from "@/pages/client/support/ClientSupportPage"
import CoachWalletPage from "@/pages/coach/wallet/CoachWalletPage"
import SettingsPage from "@/pages/common/settings/SettingsPage"
import { ClientChatPage } from "@/pages/client/chats/chat/ClientChatPage"
import ClientChatListPage from "@/pages/client/chats/list/ClientChatListPage"
import { routeNames } from "@/pages/route-names"
import { CoachByIdPage } from "@/pages/search/coach-by-id/CoachByIdPage"
import * as React from "react"
import { RouteConfig } from "react-router-config"
import { LandingPage } from "./landing/LandingPage"
import { SearchPage } from "./search/SearchPage"
import { CoachChatPage } from "@/pages/coach/chats/chat/CoachChatPage"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { ClientSessionPage } from "@/pages/client/session/ClientSessionPage"
import { CoachSessionPage } from "@/pages/coach/session/CoachSessionPage"
import { EditClientProfilePage } from "@/pages/client/edit-profile/EditClientProfile"
import { ClientNotificationsPage } from "@/pages/client/notifications/ClientNotificationsPage"
import { CoachNotificationsPage } from "@/pages/coach/notifications/CoachNotificationsPage"
import { SignUpWithSocialsPage } from "@/pages/auth/pages/socials/SignUpWithSocialsPage"

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
    path: routeNames.clientNotifications(),
    component: ClientNotificationsPage,
  },

  {
    path: routeNames.coachNotifications(),
    component: CoachNotificationsPage,
  },

  {
    path: routeNames.clientSession(`:id`),
    component: ClientSessionPage,
  },
  {
    path: routeNames.signup(":step"),
    component: SignUpPage,
  },
  {
    path: routeNames.signupWithSocials(),
    component: SignUpWithSocialsPage,
  },
  {
    path: routeNames.recovery(),
    component: RecoveryPage,
  },
  {
    path: routeNames.resetPassword(":token"),
    render: ({ match }) => <ResetPasswordPage token={match.params.token} />,
  },
  {
    path: routeNames.client(),
    exact: true,
    component: HomePage,
  },

  {
    path: routeNames.clientChatsList(),
    exact: true,
    component: ClientChatListPage,
  },
  {
    path: routeNames.clientChat(":id"),
    component: ClientChatPage,
  },
  {
    path: routeNames.clientProfile(),
    exact: true,
    component: ProfilePage,
  },
  {
    path: routeNames.clientWallet(),
    component: ClientWalletPage,
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
    path: routeNames.coachProfile(),
    exact: true,
    component: CoachProfilePage,
  },
  {
    path: routeNames.coachClientProfile(":id"),
    exact: true,
    component: ClientPage,
  },

  {
    path: routeNames.clientProfileEdit(),
    component: EditClientProfilePage,
  },
  {
    path: routeNames.coachProfileEdit(),
    exact: true,
    component: CoachProfileEditPage,
  },
  {
    path: routeNames.coachSessionsHistory(),
    exact: true,
    component: CoachSessionsHistory,
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
    component: CoachWalletPage,
  },
  {
    path: routeNames.coachClients(),
    exact: true,
    component: CoachClientsPage,
  },
  {
    path: routeNames.coachSupport(),
    exact: true,
    component: CoachSupportPage,
  },
  {
    path: routeNames.clientSupport(),
    exact: true,
    component: ClientSupportPage,
  },
  {
    path: routeNames.coachSchedule(),
    exact: true,
    component: CoachSchedulePage,
  },

  {
    path: routeNames.coachSession(`:id`),
    component: CoachSessionPage,
  },
  {
    path: routeNames.coachBlocked(),
    exact: true,
    component: CoachBlockedPage,
  },
  {
    path: routeNames.coachChat(":id"),
    component: CoachChatPage,
  },
  {
    path: "*",
    render: () => <NotFound />,
  },
]
