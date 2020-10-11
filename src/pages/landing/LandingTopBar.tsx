import { Icon } from "@/components/icon/Icon"
import { Input } from "@/components/input/Input"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"
import { RegisterButton } from "@/pages/landing/common/RegisterButton"
import { CategoriesPicker } from "@/pages/landing/content/top-bar/categories-picker/CategoriesPicker"
import { MobileMenu, MobileSearchButton } from "@/pages/landing/content/top-bar/mobile-menu/MobileMenu"
import { Search } from "@/pages/landing/content/top-bar/search/Search"
import { routeNames } from "@/pages/route-names"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import logo from "./assets/logo.svg"

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
    padding: 8px;
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
`

const StyledRegisterButton = styled(RegisterButton)`
  margin-left: 26px;
`

const StyledMobileMenu = styled(MobileMenu)`
  ${MobileSearchButton} {
    fill: #fff;
  }
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
  </StyledContainer>
)
