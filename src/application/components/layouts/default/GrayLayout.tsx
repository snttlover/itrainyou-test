import React from "react"
import {Layout} from "@/application/components/layouts/default/Layout"
import styled from "styled-components"
import { TopBar } from "@/application/pages/landing/content/top-bar/TopBar"

const StyledLayout = styled(Layout)`
  background: #ECEFF1;
`

type GrayLayoutProps = {
  children: React.ReactChild
}

export const GrayLayout = (props: GrayLayoutProps) => (
  <StyledLayout>
    <TopBar/>
    {props.children}
  </StyledLayout>
)
