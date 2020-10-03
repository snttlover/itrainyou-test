import { changeDashboardType } from "@/feature/dashboard/dashboard"
import { withFullRegister } from "@/feature/user/with-full-register"
import { routeNames } from "@/pages/route-names"
import { useEvent } from "effector-react/ssr"
import React, { useEffect } from "react"
import styled from "styled-components"
import { withProtect } from "@/feature/user/with-protect"
import { ToastsContainer } from "@/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { CoachTheme } from "@/components/layouts/themes"
import { DashboardContainer } from "@/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardContent } from "@/components/layouts/behaviors/dashboards/common/DashboardPageContent"
import { CoachMenu } from "@/components/layouts/behaviors/dashboards/coach/menu/CoachMenu"
import { CoachTopBar } from "@/components/layouts/behaviors/dashboards/coach/top-bar/CoachTopBar"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"
import { CoachStartedSessionsToolbar } from "@/feature/session/started-sessions-toolbar"
import { CoachSessionCall } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { CoachStartedSessionDialog } from "@/feature/session/start-session-dialog"

type DashboardTypes = {
  children: React.ReactChild
}

const Dashboard = styled(({ children, ...props }: DashboardTypes) => {
  const _changeDashboardType = useEvent(changeDashboardType)
  useEffect(() => {
    _changeDashboardType("coach")
  }, [])
  return (
    <CoachTheme>
      <CoachSessionCall />
      <DashboardContainer {...props}>
        <CoachStartedSessionDialog />
        <CoachMenu />
        <ToastsContainer />
        <DashboardContent>
          <CoachTopBar />
          <CoachStartedSessionsToolbar />
          <DashboardPageWrapper>{children}</DashboardPageWrapper>
        </DashboardContent>
      </DashboardContainer>
    </CoachTheme>
  )
})``

export const CoachDashboardLayout = withProtect({ to: routeNames.login() })(withFullRegister(Dashboard))
