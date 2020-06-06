import React from "react"
import styled from "styled-components"
import { ClientTopBar } from "@/application/components/layouts/behaviors/dashboards/client/client-dashboard-top-bar/ClientTopBar"
import { withProtect } from "@/application/feature/user/with-protect"
import { ToastsContainer } from "@/application/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { CoachTheme } from "@/application/components/layouts/themes"
import { DashboardContainer } from "@/application/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardPageContent } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageContent"
import { CoachMenu } from "@/application/components/layouts/behaviors/dashboards/coach/menu/CoachMenu"

type DashboardTypes = {
  children: React.ReactChild
}

const Dashboard = styled(({ children, ...props }: DashboardTypes) => (
  <CoachTheme>
    <DashboardContainer {...props}>
      <CoachMenu />
      <ToastsContainer />
      <DashboardPageContent>
        <ClientTopBar />
        {children}
      </DashboardPageContent>
    </DashboardContainer>
  </CoachTheme>
))``

export const CoachDashboardLayout = withProtect({ to: "/login", as: "/login" })(Dashboard)
