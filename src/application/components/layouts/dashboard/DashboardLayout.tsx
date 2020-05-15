import React from "react"
import styled from "styled-components"
import { Menu } from "@/application/components/layouts/dashboard/menu/Menu"

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
  height: 100%;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
`

export const DashboardLayout = styled(({ children, ...props }: DashboardTypes) => (
  <Layout {...props}>
    <Menu />
    <PageContent>{children}</PageContent>
  </Layout>
))``
