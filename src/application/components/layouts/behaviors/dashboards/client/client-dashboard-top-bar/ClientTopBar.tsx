import React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { CategoriesPicker } from "@/application/pages/landing/content/top-bar/categories-picker/CategoriesPicker"
import { Search } from "@/application/pages/landing/content/top-bar/search/Search"
import { ClientTopBarIconButtons } from "@/application/components/layouts/behaviors/dashboards/client/client-dashboard-top-bar/ClientTopBarIconButtons"
import { Logo } from "@/application/pages/landing/content/top-bar/logo/Logo"
import Link from "next/link"

const StyledLogo = styled(Logo)`
  margin-right: 40px;
  cursor: pointer;
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
  @media screen and (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`

const Container = styled.div`
  width: 100%;
  background: #dbdee0;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    background: ${props => props.theme.colors.primary};
  }
`

const StyledContainer = styled(LandingPageContainer)`
  width: 100%;
  align-items: center;
  padding: 15px 40px;
  display: flex;
  @media screen and (max-width: 480px) {
    padding: 8px;
    justify-content: space-between;
  }
`

const StyledCategoriesPicker = styled(CategoriesPicker)`
  margin-right: 16px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const StyledSearch = styled(Search)`
  width: auto;
  flex: 1;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const ClientTopBar = () => (
  <Container>
    <StyledContainer>
      <Link href='/client' passHref>
        <StyledLogo />
      </Link>
      <SearchWrapper>
        <StyledCategoriesPicker />
        <StyledSearch />
      </SearchWrapper>
      <ClientTopBarIconButtons />
    </StyledContainer>
  </Container>
)
