import React from "react"
import styled from "styled-components"
import { withProtect } from "@/application/feature/user/with-protect"
import { ToastsContainer } from "@/application/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { CoachTheme } from "@/application/components/layouts/themes"
import { DashboardContainer } from "@/application/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardPageContent } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageContent"
import { CoachMenu } from "@/application/components/layouts/behaviors/dashboards/coach/menu/CoachMenu"
import { CoachTopBar } from "@/application/components/layouts/behaviors/dashboards/coach/top-bar/CoachTopBar"

type DashboardTypes = {
  children: React.ReactChild
}

const Dashboard = styled(({ children, ...props }: DashboardTypes) => (
  <CoachTheme>
    <DashboardContainer {...props}>
      <CoachMenu />
      <ToastsContainer />
      <DashboardPageContent>
        <CoachTopBar />
        {children}
      </DashboardPageContent>
    </DashboardContainer>
  </CoachTheme>
))``

export const CoachDashboardLayout = withProtect({ to: "/login", as: "/login" })(Dashboard)
