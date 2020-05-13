import styled from "styled-components"
import React from "react"
import {MobileHeader} from "@/application/components/layouts/dashboard/menu/content/MobileHeader"
import {ProfileHeader} from "@/application/components/layouts/dashboard/menu/content/ProfileHeader"
import {MenuItems} from "./content/MenuItems"
import {CoachLink} from "@/application/components/layouts/dashboard/menu/content/CoachLink"
import { MediaRange } from "@/application/lib/responsive/media"
import {DesktopLogo} from "@/application/components/layouts/dashboard/menu/content/DesktopLogo"
import {blueLayoutMobileMenuVisibility} from './blue-layout.mobile-menu'
import { useStore } from "effector-react"

type StyledMenuWrapperTypes = {
  showOnMobile: boolean
}

const StyledMenuWrapper = styled.div<StyledMenuWrapperTypes>`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  z-index: 200;
  background: #4858CC;
  color: #fff;
  font-family: Roboto;
  padding: 14px 16px;
  display: ${({ showOnMobile }) => showOnMobile ? `flex` : `none`};
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;

  ${MediaRange.greaterThan('tablet')`
    position: relative;
    display: flex;
    width: 200px;
    padding: 0;
  `}
`

export const Menu = () => {
  const mobileMenuVisibility = useStore(blueLayoutMobileMenuVisibility)

  return (
    <StyledMenuWrapper showOnMobile={mobileMenuVisibility}>
      <DesktopLogo />
      <MobileHeader />
      <ProfileHeader />
      <MenuItems />
      <CoachLink />
    </StyledMenuWrapper>
  )
}
