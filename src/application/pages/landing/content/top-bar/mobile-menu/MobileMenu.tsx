import * as React from "react"
import styled from "styled-components"
import {Icon} from "@/application/components/icon/Icon"
import { useState } from "react"
import { Search } from "@/application/pages/landing/content/top-bar/search/Search"
import {Input} from "@/application/components/input/Input"
import { Categories, StyledCategoryCheckbox } from "@/application/pages/landing/content/top-bar/categories-picker/Categories"
import {Button} from "@/application/components/button/normal/Button"
import { MediaRange } from "@/application/lib/responsive/media"

const MobileSearchButton = styled(Icon).attrs({ name: `search` })`
  width: 36px;
  height: 36px;
  fill: #4858CC;
  display: none;
  margin-left: 25px;
  @media screen and (max-width: 768px) {
    display: flex;
  }
  @media screen and (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ECEFF1;
  z-index: 100;
  left: 0;
  top: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  @media screen and (min-width: 769px) {
    display: none;
  }
`

const StyledSearch = styled(Search)`
  flex: 0;
  margin-top: 10px;
  ${Input} {
    border-radius: 2px !important;
    padding: 14px 16px;
  }
`

const Close = styled(Icon).attrs({ name: `close` })`
  width: 36px;
  height: 36px;
  align-self: flex-end;
`

const CategoriesWrapper = styled.div`
  flex: 1;
  margin-top: 40px;
  ${StyledCategoryCheckbox} {
    margin-top: 12px;
    background: #fff;  
    padding: 12px 16px;
    border-radius: 2px;
  }
`

const SearchButtonWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  ${Button} {
    flex: 1;
  }
  ${MediaRange.greaterThan("mobile")`
    ${Button} {
      flex: 0;
      flex-basis: 160px;
    }
  `}
`

export const MobileMenu = () => {
  const [menuVisibility, changeMenuVisibility] = useState(false)

  const Menu = (
    <Container>
      <Close onClick={() => changeMenuVisibility(false)} />
      <StyledSearch />

      <CategoriesWrapper>
        <Categories />
      </CategoriesWrapper>
      <SearchButtonWrapper>
        <Button onClick={() => changeMenuVisibility(false)} >Поиск</Button>
      </SearchButtonWrapper>
    </Container>
  )

  return (
    <>
      <MobileSearchButton onClick={() => changeMenuVisibility(true)} />

      {menuVisibility && Menu}
    </>
  )
}
