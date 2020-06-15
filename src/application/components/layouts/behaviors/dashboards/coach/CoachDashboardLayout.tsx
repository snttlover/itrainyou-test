import React from "react"
import styled from "styled-components"
import { withProtect } from "@/application/feature/user/with-protect"
import { ToastsContainer } from "@/application/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { CoachTheme } from "@/application/components/layouts/themes"
import { DashboardContainer } from "@/application/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardContent } from "@/application/components/layouts/behaviors/dashboards/common/DashboardContent"
import { CoachMenu } from "@/application/components/layouts/behaviors/dashboards/coach/menu/CoachMenu"
import { CoachTopBar } from "@/application/components/layouts/behaviors/dashboards/coach/top-bar/CoachTopBar"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"

type DashboardTypes = {
  children: React.ReactChild
}

const Dashboard = styled(({ children, ...props }: DashboardTypes) => (
  <CoachTheme>
    <DashboardContainer {...props}>
      <CoachMenu />
      <ToastsContainer />
      <DashboardContent>
        <CoachTopBar />
        <DashboardPageWrapper>
          {children}
        </DashboardPageWrapper>
      </DashboardContent>
    </DashboardContainer>
  </CoachTheme>
))``

export const CoachDashboardLayout = withProtect({ to: "/auth/login", as: "/auth/login" })(Dashboard)
