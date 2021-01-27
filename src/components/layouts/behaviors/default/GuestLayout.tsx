import * as React from "react"
import { Layout } from "@/components/layouts/behaviors/default/Layout"
import styled from "styled-components"
import { TopBar } from "@/pages/landing/content/top-bar/TopBar"
import { ClientTheme } from "@/components/layouts/themes"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"

const StyledLayout = styled(Layout)`
  background: #F4F5F7;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

type GrayLayoutProps = {
  children: React.ReactChild
}

export const GuestLayout = (props: GrayLayoutProps) => (
  <ClientTheme>
    <StyledLayout>
      <TopBar />
      <DashboardPageWrapper>{props.children}</DashboardPageWrapper>
    </StyledLayout>
  </ClientTheme>
)
