import React from "react"
import styled from "styled-components"

import { Link } from "react-router-dom"
import { routeNames } from "@/pages/route-names"

import { Container } from "../common/Container"
import { RegisterButton } from "../common/RegisterButton"

import logoImg from "../assets/header/logo.svg"

const Wrapper = styled.header`
  width: 100%;
  position: absolute;
  z-index: 2;
`

const StyledContainer = styled(Container)`
  padding: 16px 0;
  display: flex;
  align-items: center;
  color: white;
  position: relative;

  @media (min-width: 558px) {
    padding: 16px 0;
  }

  @media (min-width: 768px) {
    padding: 24px 0;
  }

  @media (min-width: 1024px) {
    padding: 24px 0;
  }

  @media (min-width: 1140px) {
    padding: 24px 0;
  }
`

const LogoLink = styled(Link)`
  cursor: pointer;
  display: block;
  flex-shrink: 0;
`

const Logo = styled.img`
  height: 36px;
  display: block;
`

const NavLink = styled(Link)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  color: white;
`

const SearchCoachLink = styled(NavLink)`
  text-decoration: underline;
  color: #e1e6ea;
  position: absolute;
  left: 0;
  bottom: -20px;

  @media (min-width: 768px) {
    position: static;
    margin-left: auto;
  }
`

const LoginLink = styled(NavLink)`
  margin-left: auto;

  @media (min-width: 768px) {
    margin-left: 40px;
  }
`

const StyledRegisterButton = styled(RegisterButton)`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    padding: 9px 24px;
    margin-left: 32px;
  }
`

export const Header = () => (
  <Wrapper>
    <StyledContainer>
      <LogoLink to={{ pathname: routeNames.landing(), search: "" }}>
        <Logo src={logoImg} />
      </LogoLink>

      <SearchCoachLink to={{ pathname: routeNames.search() }}>Найти коуча</SearchCoachLink>
      <LoginLink to={routeNames.login()}>Войти</LoginLink>

      <StyledRegisterButton to={routeNames.signup("1")}>Зарегистрироваться</StyledRegisterButton>
    </StyledContainer>
  </Wrapper>
)
