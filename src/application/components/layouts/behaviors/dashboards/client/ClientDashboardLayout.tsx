import React from "react"
import styled from "styled-components"
import { ClientMenu } from "@/application/components/layouts/behaviors/dashboards/client/menu/ClientMenu"
import { ClientTopBar } from "@/application/components/layouts/behaviors/dashboards/client/client-dashboard-top-bar/ClientTopBar"
import { withProtect } from "@/application/feature/user/with-protect"
import { ToastsContainer } from "@/application/components/layouts/behaviors/dashboards/common/toasts/ToastsContainer"
import { DashboardContainer } from "@/application/components/layouts/behaviors/dashboards/common/DashboardContainer"
import { DashboardContent } from "@/application/components/layouts/behaviors/dashboards/common/DashboardContent"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"

type DashboardTypes = {
  children: React.ReactChild
}

const Dashboard = styled(({ children, ...props }: DashboardTypes) => (
  <DashboardContainer {...props}>
    <ClientMenu />
    <ToastsContainer />
    <DashboardContent>
      <ClientTopBar />
      <DashboardPageWrapper>
        {children}
      </DashboardPageWrapper>
    </DashboardContent>
  </DashboardContainer>
))``

export const ClientDashboardLayout = withProtect({ to: "/auth/login", as: "/auth/login" })(Dashboard)
