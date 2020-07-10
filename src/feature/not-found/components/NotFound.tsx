import React from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

const Container = styled.div``

const DesktopIcon = styled(Icon).attrs({ name: "not-found-desktop" })`
  width: 100%;
  margin: 0 auto;
  margin-top: 64px;
  max-width: 691px;
  display: block;
  height: auto;
  fill: ${props => props.theme.colors.primary};
  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`

const TabletIcon = styled(Icon).attrs({ name: "not-found-tablet" })`
  width: 100%;
  margin: 0 auto;
  margin-top: 204px;
  max-width: 691px;
  display: block;
  height: auto;
  fill: ${props => props.theme.colors.primary};
  ${MediaRange.greaterThan(`desktop`)`
    display: none;
  `}
  ${MediaRange.lessThan(`mobile`)`
    display: none;
  `}
`

const MobileIcon = styled(Icon).attrs({ name: "not-found-mobile" })`
  width: 100%;
  margin: 0 auto;
  margin-top: 89px;
  max-width: 400px;
  display: none;
  height: auto;
  fill: ${props => props.theme.colors.primary};
  ${MediaRange.lessThan(`mobile`)`
    display: block;
  `}
`


export const NotFound = () => (
    <Container>
      <DesktopIcon />
      <TabletIcon />
      <MobileIcon />
    </Container>
)
