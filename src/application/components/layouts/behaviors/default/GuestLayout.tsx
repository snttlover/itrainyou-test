import React from "react"
import { Layout } from "@/application/components/layouts/behaviors/default/Layout"
import styled from "styled-components"
import { TopBar } from "@/application/pages/landing/content/top-bar/TopBar"
import { ClientTheme } from "@/application/components/layouts/themes"

const StyledLayout = styled(Layout)`
  background: #eceff1;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

type GrayLayoutProps = {
  children: React.ReactChild
}

const PageContainer = styled.div`
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
`

export const GuestLayout = (props: GrayLayoutProps) => (
  <StyledLayout>
    <TopBar />
    <PageContainer>{props.children}</PageContainer>
  </StyledLayout>
)
