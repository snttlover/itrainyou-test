import { CategoriesPicker } from "@/pages/landing/content/top-bar/categories-picker/CategoriesPicker"
import * as React from "react"
import styled from "styled-components"
import { Search } from "@/pages/landing/content/top-bar/search/Search"
import closeImage from "@/pages/landing/content/top-bar/mobile-menu/images/close.svg"

const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
  }
`


const StyledCategoriesPicker = styled(CategoriesPicker)`
  @media screen and (max-width: 480px) {
    margin-bottom: 8px;
    width: 100%;
    order: 2;
    & > button {
      width: 100%;
    }
  }
`

type HeaderTypes = {
  close: () => void
}

export const Header = (props: HeaderTypes) => (
  <StyledHeader>
  </StyledHeader>
)
