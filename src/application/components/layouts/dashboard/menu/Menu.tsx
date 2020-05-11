import styled from "styled-components"
import React from "react"
import {MobileHeader} from "@/application/components/layouts/dashboard/menu/content/MobileHeader"
import {ProfileHeader} from "@/application/components/layouts/dashboard/menu/content/ProfileHeader"
import {MenuItems} from "./content/MenuItems"
import {CoachLink} from "@/application/components/layouts/dashboard/menu/content/CoachLink"

const StyledMenuWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 200;
  background: #4858CC;
  color: #fff;
  font-family: Roboto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
`

export const Menu = () => (
  <StyledMenuWrapper>
    <MobileHeader />
    <ProfileHeader />
    <MenuItems />
    <CoachLink />
  </StyledMenuWrapper>
)
