import * as React from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { useState } from "react"
import { Search } from "@/pages/landing/content/top-bar/search/Search"
import { Input } from "@/components/input/Input"
import { Categories, StyledCategoryCheckbox } from "@/pages/landing/content/top-bar/categories-picker/Categories"
import { Button } from "@/components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent, useStore } from "effector-react/ssr"
import {
  $mobileMenuVisibility,
  changeMobileMenuVisibility
} from "@/pages/landing/content/top-bar/mobile-menu/mobile-menu.model"

export const MobileSearchButton = styled(Icon).attrs({ name: `search` })`
  width: 36px;
  height: 36px;
  fill: #4858cc;
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
  background: #eceff1;
  z-index: 100;
  left: 0;
  top: 0;
  padding: 16px;
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
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 3px;
    ${Input} {
      padding: 8px;
    }
  `}
`

const tabletCloseIconSize = `36px`
const mobileCloseIconSize = `24px`
const Close = styled(Icon).attrs({ name: `close` })`
  fill: #4858cc;
  width: ${tabletCloseIconSize};
  height: ${tabletCloseIconSize};
  align-self: flex-end;
  ${MediaRange.lessThan(`mobile`)`
    width: ${mobileCloseIconSize};
    height: ${mobileCloseIconSize};
  `}
`

const CategoriesWrapper = styled.div`
  margin-top: 64px;
  ${StyledCategoryCheckbox} {
    margin-top: 12px;
    background: #fff;
    padding: 12px 16px;
    border-radius: 2px;
  }
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 24px;
  `}
`

const ItemsWrapper = styled.div`
  height: auto;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`

const SearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 54px;
  ${Button} {
    flex: 1;
  }
  ${MediaRange.greaterThan("mobile")`
    margin-top: 64px;
    ${Button} {
      flex: 0;
      flex-basis: 160px;
    }
  `}
`

const StyledContainer = styled.div``

type MobileMenuTypes = {
  className?: string
}

export const MobileMenu = (props: MobileMenuTypes) => {
  const menuVisibility = useStore($mobileMenuVisibility)
  const changeMenuVisibility = useEvent(changeMobileMenuVisibility)

  const Menu = (
    <Container>
      <ItemsWrapper>
        <Close onClick={() => changeMenuVisibility(false)} />
        <StyledSearch />

        <CategoriesWrapper>
          <Categories />
        </CategoriesWrapper>
        <SearchButtonWrapper>
          <Button onClick={() => changeMenuVisibility(false)}>Поиск</Button>
        </SearchButtonWrapper>
      </ItemsWrapper>
    </Container>
  )

  return (
    <StyledContainer className={props.className}>
      <MobileSearchButton onClick={() => changeMenuVisibility(true)} />

      {menuVisibility && Menu}
    </StyledContainer>
  )
}
