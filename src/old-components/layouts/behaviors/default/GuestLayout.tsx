import * as React from "react"
import { Layout } from "@/old-components/layouts/behaviors/default/Layout"
import styled from "styled-components"
import { TopBar } from "@/pages/landing-old/content/top-bar/TopBar"
import { ClientTheme } from "@/old-components/layouts/themes"
import { DashboardPageWrapper } from "@/application/components/layouts/behaviors/dashboards/common/DashboardPageWrapper"

const StyledLayout = styled(Layout)`
  background: #f4f5f7;
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
