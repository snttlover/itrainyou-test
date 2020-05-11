import styled from "styled-components"
import React from "react"
import {MobileHeader} from "@/application/components/layouts/dashboard/menu/MobileHeader"
import {ProfileHeader} from "@/application/components/layouts/dashboard/menu/ProfileHeader"
import {MenuItems} from "./MenuItems"

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
`

export const Menu = () => (
  <StyledMenuWrapper>
    <MobileHeader />
    <ProfileHeader />
    <MenuItems />
  </StyledMenuWrapper>
)
