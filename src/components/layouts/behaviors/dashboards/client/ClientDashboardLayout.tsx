import { FundsUpDialog } from "@/feature/client-funds-up/dialog/FundsUpDialog"
import { ConfirmationGate } from "@/feature/client-funds-up/confirmation.model"
import { changeDashboardType } from "@/feature/dashboard/dashboard"
import { withFullRegister } from "@/feature/user/with-full-register"
import { routeNames } from "@/pages/route-names"
import { useEvent, useGate } from "effector-react"
import React, { useEffect } from "react"
import styled from "styled-components"
import { ClientMenu } from "@/components/layouts/behaviors/dashboards/client/menu/ClientMenu"
import { ClientTopBar } from "@/components/layouts/behaviors/dashboards/client/client-dashboard-top-bar/ClientTopBar"
import { withProtect } from "@/feature/user/with-protect"
import { ToastsContainer } from "@/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { DashboardContainer } from "@/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardContent } from "@/components/layouts/behaviors/dashboards/common/DashboardPageContent"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"
import { ClientStartedSessionsToolbar } from "@/feature/session/started-sessions-toolbar"
import { ClientSessionCall } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { ClientStartedSessionDialog } from "@/feature/session/start-session-dialog"
import { BookSessionsStatusModalDialog } from "@/pages/search/content/list/content/modals/BookSessionsStatusModalDialog"
import { NoPermissionGrantedDialog } from "@/components/layouts/behaviors/dashboards/call/NoPermissionGrantedDialog"

type DashboardTypes = {
  children: React.ReactChild
}

const Dashboard = styled(({ children, ...props }: DashboardTypes) => {
  useGate(ConfirmationGate)
  const changeDashboard = useEvent(changeDashboardType)
  useEffect(() => {
    changeDashboard("client")
  }, [])

  return (
    <DashboardContainer {...props}>
      <ClientSessionCall />
      <BookSessionsStatusModalDialog />
      <ClientMenu />
      <ToastsContainer />
      <DashboardContent>
        <ClientStartedSessionDialog />
        <NoPermissionGrantedDialog />
        <FundsUpDialog />
        <ClientTopBar />
        <ClientStartedSessionsToolbar />
        <DashboardPageWrapper>{children}</DashboardPageWrapper>
      </DashboardContent>
    </DashboardContainer>
  )
})``

export const ClientDashboardLayout = withProtect({ to: routeNames.login() })(withFullRegister(Dashboard))
