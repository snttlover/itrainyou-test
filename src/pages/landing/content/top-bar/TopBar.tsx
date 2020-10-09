import { routeNames } from "@/pages/route-names"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "../../common/LandingPageContainer"
import { Logo } from "./logo/Logo"
import { CategoriesPicker } from "./categories-picker/CategoriesPicker"
import { Search } from "./search/Search"
import { LoginButtons } from "./login-buttons/LoginButtons"
import { MobileMenu } from "./mobile-menu/MobileMenu"

const StyledContainer = styled(LandingPageContainer)`
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 21px 0;
  }
  @media screen and (max-width: 480px) {
    padding: 8px;
    justify-content: space-between;
  }
`

const Container = styled.div`
  width: 100%;
  // background: #dbdee0;
  display: flex;
  justify-content: center;
`

const StyledLogo = styled(Logo)`
  margin-right: 40px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`

const StyledCategoriesPicker = styled(CategoriesPicker)`
  margin-right: 20px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const StyledSearch = styled(Search)`
  width: auto;
  flex: 1;
  max-width: 536px;
  margin-left: 16px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const StyledLoginButtons = styled(LoginButtons)`
  margin-left: 24px;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    flex: 1;
    display: flex;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`

const StyledLogoLink = styled(Link)`
  display: flex;
  align-items: center;
`

export const TopBar = () => (
  <Container>
    <StyledContainer>
      <StyledLogoLink to={{ pathname: routeNames.landing(), search: "" }}>
        <StyledLogo />
      </StyledLogoLink>
      <StyledCategoriesPicker />
      <StyledSearch />
      <StyledLoginButtons />
      <MobileMenu />
    </StyledContainer>
  </Container>
)
