import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "../../common/LandingPageContainer"

import { Logo } from "./logo/Logo"
import { CategoriesPicker } from "./categories-picker/CategoriesPicker"
import { Search } from "./search/Search"
import { LoginButtons } from "./login-buttons/LoginButtons"

const StyledContainer = styled(LandingPageContainer)`
  padding: 15px 0;
  display: flex;
  align-items: center;
`

const StyledLogo = styled(Logo)`
  margin-right: 40px;
`

const StyledCategoriesPicker = styled(CategoriesPicker)`
  margin-right: 20px;
`

const StyledSearch = styled(Search)`
  width: auto;
  flex: 1;
  max-width: 536px;
  margin-left: 16px;
`

const StyledLoginButtons = styled(LoginButtons)`
  margin-left: 24px;
`

export const TopBar = () => (
  <StyledContainer>
    <StyledLogo />
    <StyledCategoriesPicker />
    <StyledSearch />
    <StyledLoginButtons />
  </StyledContainer>
)
