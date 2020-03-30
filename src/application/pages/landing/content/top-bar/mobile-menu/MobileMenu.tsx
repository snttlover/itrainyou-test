import * as React from "react"
import styled from "styled-components"
import burgerImage from "./images/burger.svg"
import { Header } from "./content/Header"
import { Profile } from "./content/Profile"
import { MobileRegistrationBlock } from "@/application/pages/landing/content/top-bar/mobile-menu/content/MobileRegistrationBlock"
import { MenuItems } from "./content/menu-items/MenuItems"
import { useState } from "react"

const Burger = styled.img.attrs({ src: burgerImage })`
  margin-left: 34px;
  width: 36px;
  height: 36px;
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 100;
  left: 0;
  top: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  @media screen and (min-width: 769px) {
    display: none;
  }
`

const StartCoach = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #449bd9;
  text-align: center;
  margin-top: 20px;
`

export const MobileMenu = () => {
  const [menuVisibility, changeMenuVisibility] = useState(false)

  const Menu = (
    <Container>
      <Header close={() => changeMenuVisibility(false)} />
      <MobileRegistrationBlock />
      {/*<Profile />*/}
      <MenuItems />
      {/*<StartCoach onClick={() => changeMenuVisibility(false)}>Стать коучем</StartCoach>*/}
    </Container>
  )

  return (
    <>
      <Burger onClick={() => changeMenuVisibility(true)} />

      {menuVisibility && Menu}
    </>
  )
}
