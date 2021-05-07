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
`

const StyledContainer = styled(Container)`
  padding: 24px 0;
  display: flex;
  align-items: center;
  color: white;
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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;
`

const NavLink = styled(Link)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 40px;
  }

  &:hover {
    color: #e1e6ea;
  }

  &:active {
    text-decoration-line: underline;
    color: #e1e6ea;
  }
`

const StyledRegisterButton = styled(RegisterButton)`
  margin-left: 32px;
`

export const Header = () => (
  <Wrapper>
    <StyledContainer>
      <LogoLink to={{ pathname: routeNames.landing(), search: "" }}>
        <Logo src={logoImg} />
      </LogoLink>
      <Nav>
        <NavLink to={{ pathname: routeNames.search() }}>Найти коуча</NavLink>
        <NavLink to={routeNames.login()}>Войти</NavLink>
      </Nav>
      <StyledRegisterButton to={routeNames.signup("1")}>Зарегистрироваться</StyledRegisterButton>
    </StyledContainer>
  </Wrapper>
)
