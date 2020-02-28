import { CategoriesPicker } from "@/application/pages/landing/content/top-bar/categories-picker/CategoriesPicker"
import * as React from "react"
import styled from "styled-components"
import { Search } from "@/application/pages/landing/content/top-bar/search/Search"
import closeImage from "@/application/pages/landing/content/top-bar/mobile-menu/images/close.svg"

const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
  }
`

const StyledSearch = styled(Search)`
  margin-left: 16px;
  flex: 1;
  @media screen and (max-width: 480px) {
    width: 100%;
    margin: 0;
    order: 3;
  }
`

const Close = styled.img.attrs({ src: closeImage })`
  margin-left: 20px;
  width: 36px;
  height: 36px;
  @media screen and (max-width: 480px) {
    order: 1;
    align-self: flex-end;
    margin-bottom: 8px;
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
    <StyledCategoriesPicker />
    <StyledSearch />
    <Close onClick={() => props.close()} />
  </StyledHeader>
)
