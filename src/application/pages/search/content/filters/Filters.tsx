import * as React from "react"
import styled from "styled-components"
import { PriceFilter } from "./content/price-filter/PriceFilter"
import { ReviewFilter } from "./content/ReviewFilter"
import { DateFilter } from "./content/date-filter/DateFilter"
import { OnlyTopCoachCheckbox } from "./content/OnlyTopCoachCheckbox"
import { ResetFiltersButton } from "./content/ResetFiltersButton"
import {
  $mobileFiltersVisibility,
  changeMobileFiltersVisibility
} from "@/application/pages/search/content/mobile-tabs/mobile-tabs.model"
import { useStore } from "effector-react"
import close from "./images/close.svg"
import { useLayoutEffect, useState } from "react"
import SimpleBar from 'simplebar-react';
import {SessionTimeFilter} from "./content/session-time-filter/SessionTimeFilter"
import { MediaRange } from "@/application/lib/responsive/media"

type ModalTypes = {
  showOnMobile: boolean
}

const Modal = styled.div.attrs({id: `filters-container`})<ModalTypes>`
  width: 220px;
  border-left: 1px solid #efefef;
  position: relative;
  overflow: hidden;
  transition: all 50ms;
  margin-bottom: 20px;
  margin-top: 44px;

  @media screen and (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 0;
    width: 276px;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 300;
    transition: left 300ms;
    right: ${props => (props.showOnMobile ? 0 : `-276px`)};
    background: #fff;
  }
`

const StyledSimpleBar = styled(SimpleBar)`
  width: 100%;
  height: 100%;
  & .simplebar-content-wrapper {
    overflow: auto;
  }
  .simplebar-track.simplebar-vertical {
    width: 7px;
  }
`

const MobileClose = styled.img.attrs({ src: close })`
  cursor: pointer;
  display: block;
  align-self: flex-end;
  margin-bottom: 20px;
  
  ${MediaRange.greaterThan("mobile")`
    margin-bottom: 131px;
  `}
  
  ${MediaRange.greaterThan("tablet")`
    display: none;
  `}
`

const Container = styled.div`
  padding: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    padding: 40px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
`

const Header = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`

export const Filters = () => {
  const showOnMobile = useStore($mobileFiltersVisibility)
  return (
    <Modal showOnMobile={showOnMobile}>
      <StyledSimpleBar>
        <Container>
          <MobileClose onClick={() => changeMobileFiltersVisibility(false)} />
          <Header>Фильтры</Header>
          <SessionTimeFilter />
          <PriceFilter />
          <ReviewFilter />
          <DateFilter />
          <OnlyTopCoachCheckbox />
          <ResetFiltersButton />
        </Container>
      </StyledSimpleBar>
    </Modal>
  )
}
