import { Icon } from "@/components/icon/Icon"
import { Input } from "@/components/input/Input"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"
import { RegisterButton } from "@/pages/landing/common/RegisterButton"
import { CategoriesPicker } from "@/pages/landing/content/top-bar/categories-picker/CategoriesPicker"
import { MobileMenu, MobileSearchButton } from "@/pages/landing/content/top-bar/mobile-menu/MobileMenu"
import { Search } from "@/pages/landing/content/top-bar/search/Search"
import { routeNames } from "@/pages/route-names"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import logo from "./assets/logo.svg"
import mobileBurgerBg from "./assets/mobile-burger-menu-bg.svg"

const StyledContainer = styled(LandingPageContainer)`
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  z-index: 2;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 21px 36px;
  }
  @media screen and (max-width: 480px) {
    padding: 24px 12px;
    margin: 0;
    justify-content: space-between;
  }
`

const StyledLogo = styled.img.attrs({ src: logo })`
  width: 165px;
  height: 44px;
  margin-right: 40px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    margin-right: 16px;
  }

  @media screen and (max-width: 480px) {
    width: 135px;
    height: 36px;
  }
`

const StyledLogoLink = styled(Link)`
  display: flex;
  align-items: center;
`

const StyledCategoriesPicker = styled(CategoriesPicker)`
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    margin-right: 46px;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`

const StyledSearch = styled(Search)`
  width: auto;
  height: 36px;
  flex: 1;
  max-width: 396px;

  ${Input} {
    height: 36px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const LoginLink = styled(Link)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    margin-left: 0;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`

const StyledRegisterButton = styled(RegisterButton)`
  margin-left: 26px;
`

const StyledMobileMenu = styled(MobileMenu)`
  ${MobileSearchButton} {
    fill: #fff;

    width: 36px;
    height: 36px;
  }
`

const Burger = styled(Icon).attrs({ name: "burger" })`
  fill: #fff;
  width: 36px;
  height: 36px;
`

export const LandingTopBar = () => (
  <StyledContainer>
    <StyledLogoLink to={{ pathname: routeNames.landing(), search: "" }}>
      <StyledLogo />
    </StyledLogoLink>
    <StyledCategoriesPicker />
    <StyledSearch />
    <ButtonsContainer>
      <LoginLink to={routeNames.login()}>Войти</LoginLink>
      <Link to={routeNames.signup("1")}>
        <StyledRegisterButton>Зарегистрироваться</StyledRegisterButton>
      </Link>
    </ButtonsContainer>
    <StyledMobileMenu />
    <BurgerMenu />
  </StyledContainer>
)

const BurgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <Burger onClick={() => setShowMenu(true)} />
      {showMenu && (
        <BurgerContentContainer>
          <CrossIcon onClick={() => setShowMenu(false)} />
          <MenuImage />
          <StyledRegisterLink to={routeNames.signup("1")}>
            <RegisterButton>Зарегистрироваться</RegisterButton>
          </StyledRegisterLink>
          <LoginButtonLink to={routeNames.login()}>Войти</LoginButtonLink>
        </BurgerContentContainer>
      )}
    </>
  )
}

const BurgerContentContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0058cc -5.89%, #5758cc 51.66%, #8b58cc 97.71%);
  z-index: 100;
  left: 0;
  top: 0;
  padding: 24px;
  overflow: hidden;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 479px) {
    display: none;
  }
`

const CrossIcon = styled(Icon).attrs({ name: "cross" })`
  width: 24px;
  height: 24px;

  position: absolute;
  right: 12px;
  top: 16px;

  fill: #fff;
`

const MenuImage = styled.img.attrs({ src: mobileBurgerBg })`
  margin-top: auto;
`

const StyledRegisterLink = styled(Link)`
  margin-top: auto;
  width: 100%;
  ${RegisterButton} {
    width: 100%;
  }
`

const LoginButtonLink = styled(Link)`
  margin-top: 16px;
  width: 100%;
  height: 34px;
  background: #ffffff;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #4858cc;
`
