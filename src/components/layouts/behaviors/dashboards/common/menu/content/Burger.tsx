import * as React from "react"
import styled from "styled-components"
import { useEvent } from "effector-react/ssr"
import { toggleBlueLayoutMobileMenuVisibility } from "#/components/layouts/behaviors/dashboards/client/menu/blue-layout.mobile-menu"
import { Icon } from "#/components/icon/Icon"

export const StyledBurger = styled(Icon).attrs({ name: `burger` })`
  margin-left: 24px;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  cursor: pointer;
  fill: #4858cc;
  width: 28px;
  height: 28px;
  @media screen and (max-width: 768px) {
    fill: #fff;
    width: 36px;
    height: 36px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 16px;
    width: 24px;
    height: 24px;
  }
`

export const Burger = () => {
  const showMobileMenu = useEvent(toggleBlueLayoutMobileMenuVisibility)

  return <StyledBurger onClick={() => showMobileMenu()} />
}
