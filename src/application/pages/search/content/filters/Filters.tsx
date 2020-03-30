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

type ModalTypes = {
  showOnMobile: boolean
}

const Modal = styled.div.attrs({id: `filters-container`})<ModalTypes>`
  width: 220px;
  border-left: 1px solid #efefef;
  background: #fff;
  position: relative;
  overflow: hidden;
  transition: all 50ms;
  @media screen and (max-width: 480px) {
    position: fixed;
    top: 0;
    width: 100%;
    transition: left 300ms;
    left: ${props => (props.showOnMobile ? 0 : `100%`)};
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
  position: absolute;
  cursor: pointer;
  margin-top: -30px;
  margin-left: -40px;
  display: none;
  @media screen and (max-width: 480px) {
  display: block;
  }
`

const Container = styled.div`
  padding: 12px;
  @media screen and (max-width: 480px) {
    padding: 60px 52px 52px 72px;
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

const useWindowSize = () => {
  const initial = { height: `100%`, transform: `none` }
  const [size, setSize] = useState({...initial});
  // @ts-ignore
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      const scrollingElement = window.document.scrollingElement as HTMLDivElement
      const filtersContainer = window.document.getElementById(`filters-container`) as HTMLDivElement

      function updateSizes() {
        if (window.innerWidth <= 480) {
          return setSize({...initial})
        }

        const scrollTopOffset = filtersContainer.offsetTop - scrollingElement.scrollTop
        let height = `${window.innerHeight - scrollTopOffset}px`
        let transform = `none`

        if (scrollTopOffset < 0) {
          height =  `${window.innerHeight}px`
          transform = `translateY(${scrollingElement.scrollTop - filtersContainer.offsetTop}px)`
        }

        setSize({ height, transform });
      }
      window.addEventListener(`resize`, updateSizes);
      window.addEventListener(`scroll`, updateSizes)
      updateSizes();
      return () => {
        window.removeEventListener(`scroll`, updateSizes)
        window.removeEventListener(`resize`, updateSizes);
      }
    }, []);
  }

  return size;
}

export const Filters = () => {
  const showOnMobile = useStore($mobileFiltersVisibility)

  let modalStyles = useWindowSize()

  return (
    <Modal showOnMobile={showOnMobile} style={modalStyles}>
      <StyledSimpleBar>
        <Container>
          <MobileClose onClick={() => changeMobileFiltersVisibility(false)} />
          <Header>Фильтры</Header>
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
