import React from "react"
import {Layout} from "@/components/layouts/behaviors/default/Layout"
import styled from "styled-components"
import { TopBar } from "@/pages/landing/content/top-bar/TopBar"
import { ClientTheme } from "@/components/layouts/themes"

const StyledLayout = styled(Layout)`
  background: #ECEFF1;
  min-height: 100vh;
`

type GrayLayoutProps = {
  children: React.ReactChild
}

export const GuestLayout = (props: GrayLayoutProps) => (
  <StyledLayout>
    <TopBar/>
    {props.children}
  </StyledLayout>
)
