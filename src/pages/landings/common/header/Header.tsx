import React from "react"
import styled from "styled-components"

import { Link } from "react-router-dom"
import { routeNames } from "@/pages/route-names"

import { Container } from "../Container"
import { RegisterButton } from "../RegisterButton"

import logoImg from "./assets/logo.svg"

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
  color: #e1e6ea;
  cursor: pointer;
`

const FirstNav = styled.nav`
  position: absolute;
  left: 0;
  top: 68px;

  display: flex;
  flex-direction: column;

  ${NavLink}:not(:last-child) {
    margin-bottom: 16px;
  }

  @media (min-width: 768px) {
    position: static;
    margin-left: 40px;
    align-items: center;
    flex-direction: row;

    ${NavLink}:not(:last-child) {
      margin-right: 32px;
      margin-bottom: 0;
    }
  }
`

const SecondNav = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;

  ${NavLink}:nth-child(1) {
    display: none;
  }

  ${NavLink}:nth-child(2) {
    color: #ffffff;
  }

  @media (min-width: 1600px) {
    ${NavLink}:nth-child(1) {
      display: block;
      margin-right: 40px;
      text-decoration-line: underline;
    }
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

type Props = {
  signUpRoute: string
  additionalButton: {
    title: string
    route: string
  }
  showExtraButton: boolean
}

export const Header = ({ signUpRoute, additionalButton, showExtraButton }: Props) => (
  <Wrapper>
    <StyledContainer>
      <LogoLink to={{ pathname: routeNames.landing(), search: "" }}>
        <Logo src={logoImg} />
      </LogoLink>

      <FirstNav>
        <NavLink to={{ pathname: routeNames.search() }}>Наши коучи</NavLink>
        <NavLink to={additionalButton.route}>{additionalButton.title}</NavLink>
      </FirstNav>

      <SecondNav>
        {showExtraButton ? <NavLink to={{ pathname: routeNames.search() }}>Найти коуча</NavLink> : <></>}
        <NavLink to={routeNames.login()}>Войти</NavLink>
      </SecondNav>

      <StyledRegisterButton to={signUpRoute}>Зарегистрироваться</StyledRegisterButton>
    </StyledContainer>
  </Wrapper>
)
