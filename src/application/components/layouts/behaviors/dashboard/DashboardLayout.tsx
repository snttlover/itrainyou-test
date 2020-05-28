import React from "react"
import styled from "styled-components"
import { Menu } from "@/application/components/layouts/behaviors/dashboard/menu/Menu"
import { DenseTopBar } from "@/application/components/layouts/behaviors/dashboard/dense-top-bar/DenseTopBar"

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
  background: #ECEFF1;
`

export const DashboardLayout = styled(({ children, ...props }: DashboardTypes) => (
  <Layout {...props}>
    <Menu />
    <PageContent>
      <DenseTopBar />
      {children}
    </PageContent>
  </Layout>
))``