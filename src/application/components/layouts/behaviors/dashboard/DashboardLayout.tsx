import React from "react"
import styled from "styled-components"
import { Menu } from "@/application/components/layouts/behaviors/dashboard/menu/Menu"
import { DenseTopBar } from "@/application/components/layouts/behaviors/dashboard/dense-top-bar/DenseTopBar"
import { withProtect } from "@/application/feature/user/with-protect"
import { ToastsContainer } from "@/application/components/layouts/behaviors/dashboard/toasts/ToastsContainer"
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
      <Menu />
      <ToastsContainer />
      <PageContent>
        <DenseTopBar />
        {children}
      </PageContent>
    </Layout>
  </ClientTheme>
))``

export const DashboardLayout = withProtect({ to: "/login", as: "/login" })(Dashboard)
