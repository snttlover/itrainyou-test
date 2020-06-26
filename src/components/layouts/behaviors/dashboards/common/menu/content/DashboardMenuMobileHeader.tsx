import React from "react"
import styled from "styled-components"
import logoImage from "../../../client/menu/images/logo.svg"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent } from "effector-react/ssr"
import { toggleBlueLayoutMobileMenuVisibility } from "@/components/layouts/behaviors/dashboards/client/menu/blue-layout.mobile-menu"

const Logo = styled.img.attrs({ src: logoImage })`
  width: 36px;
  height: 36px;
`

const CloseIcon = styled(Icon).attrs({ name: `close` })`
  width: 36px;
  height: 36px;
  display: none;
  cursor: pointer;
  fill: #fff;
  ${MediaRange.lessThan("mobile")`
    width: 24px;
    height: 24px;
  `}
  ${MediaRange.lessThan("tablet")`
    display: block;
  `}
`

const StyledHeader = styled.div`
  width: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;

  ${MediaRange.lessThan(`tablet`)`
     display: flex;
  `}
`

export const DashboardMenuMobileHeader = () => {
  const toggle = useEvent(toggleBlueLayoutMobileMenuVisibility)

  return (
    <StyledHeader>
      <Logo />
      <CloseIcon onClick={() => toggle()} />
    </StyledHeader>
  )
}
