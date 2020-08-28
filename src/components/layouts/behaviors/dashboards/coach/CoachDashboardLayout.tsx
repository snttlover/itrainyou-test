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
import { StartSessionDialog } from "@/feature/session/start-session-dialog/StartSessionDialog"
import { CoachStartedSessionsToolbar } from "@/feature/session/started-sessions-toolbar"
import { createSessionCall } from "@/components/layouts/behaviors/dashboards/call/SessionCall"
import { createSessionCallModule } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"

type DashboardTypes = {
  children: React.ReactChild
}

const call = createSessionCallModule({
  dashboard: 'coach'
})

const SessionCall = createSessionCall(call)

const Dashboard = styled(({ children, ...props }: DashboardTypes) => {
  const _changeDashboardType = useEvent(changeDashboardType)
  useEffect(() => {
    _changeDashboardType("coach")
  }, [])
  return (
    <CoachTheme>
      <SessionCall />
      <DashboardContainer {...props}>
        <StartSessionDialog />
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
