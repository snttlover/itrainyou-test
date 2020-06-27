import * as React from "react"
import styled from "styled-components"
import { PriceFilter } from "./content/price-filter/PriceFilter"
import { ReviewFilter } from "./content/ReviewFilter"
import { DateFilter } from "./content/date-filter/DateFilter"
import { OnlyTopCoachCheckbox } from "./content/OnlyTopCoachCheckbox"
import { ResetFiltersButton } from "./content/ResetFiltersButton"
import {
  $mobileFiltersVisibility,
  changeMobileFiltersVisibility,
} from "@/pages/search/content/mobile-tabs/mobile-tabs.model"
import { useEvent, useStore } from "effector-react/ssr"
import close from "./images/close.svg"
import SimpleBar from "simplebar-react"
import { SessionTimeFilter } from "./content/session-time-filter/SessionTimeFilter"
import { MediaRange } from "@/lib/responsive/media"
import { useEffect, useRef, useState } from "react"

type ModalTypes = {
  showOnMobile: boolean
}

const Modal = styled.div.attrs({ id: `filters-container` })<ModalTypes>`
  width: 220px;
  border-left: 1px solid #efefef;
  position: relative;
  overflow: hidden;
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

const MARGIN_TOP = 44 // in px

export const Filters = () => {
  const showOnMobile = useStore($mobileFiltersVisibility)
  const changeVisibility = useEvent(changeMobileFiltersVisibility)
  const [marginTop, changeFiltersMargin] = useState(MARGIN_TOP)
  const modalRef = useRef<HTMLDivElement>(null)

  const computeSticky = () => {
    if (window.innerWidth <= 768) {
      changeFiltersMargin(0)
      return
    }
    const scrollingElement = document.getElementById(`page-wrapper`) as HTMLElement
    const filters = modalRef.current as HTMLElement

    const offset = filters.clientHeight - scrollingElement.clientHeight
    const positiveOffset = offset > 0
    const range = positiveOffset ? offset : 0
    const nextMargin = scrollingElement.scrollTop - range

    const marginTop = filters.offsetTop

    if (scrollingElement.scrollTop <= MARGIN_TOP) {
      changeFiltersMargin(MARGIN_TOP)
      return
    }

    if (nextMargin + filters.clientHeight + MARGIN_TOP < scrollingElement.scrollHeight) {
      if (marginTop > nextMargin + offset) {
        changeFiltersMargin(scrollingElement.scrollTop)
        return
      }

      changeFiltersMargin(nextMargin > marginTop ? nextMargin : marginTop)
      return
    }
  }

  useEffect(() => {
    const scrollingElement = document.getElementById(`page-wrapper`) as HTMLElement
    scrollingElement.addEventListener(`scroll`, computeSticky)
    window.addEventListener(`resize`, computeSticky)
    computeSticky()
    return () => {
      scrollingElement.removeEventListener(`scroll`, computeSticky)
      window.removeEventListener(`resize`, computeSticky)
    }
  }, [])

  return (
    <Modal ref={modalRef} showOnMobile={showOnMobile} style={{ marginTop }}>
      <StyledSimpleBar>
        <Container>
          <MobileClose onClick={() => changeVisibility(false)} />
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
