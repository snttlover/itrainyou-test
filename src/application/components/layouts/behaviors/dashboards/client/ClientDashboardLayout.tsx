import React from "react"
import styled from "styled-components"
import { ClientMenu } from "@/application/components/layouts/behaviors/dashboards/client/menu/ClientMenu"
import { ClientTopBar } from "@/application/components/layouts/behaviors/dashboards/client/client-dashboard-top-bar/ClientTopBar"
import { withProtect } from "@/application/feature/user/with-protect"
import { ToastsContainer } from "@/application/components/layouts/behaviors/dashboards/client/toasts/ToastsContainer"
import { ClientTheme } from "@/application/components/layouts/themes"

type DashboardTypes = {
  children: React.ReactChild
}

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const PageContent = styled.div`
  flex: 1;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  background: #eceff1;
`

const Dashboard = styled(({ children, ...props }: DashboardTypes) => (
  <ClientTheme>
    <Layout {...props}>
      <ClientMenu />
      <ToastsContainer />
      <PageContent>
        <ClientTopBar />
        {children}
      </PageContent>
    </Layout>
  </ClientTheme>
))``

export const ClientDashboardLayout = withProtect({ to: "/login", as: "/login" })(Dashboard)
