import * as React from "react"
import styled from "styled-components"
import { PriceFilter } from "./content/PriceFilter"
import { ReviewFilter } from "./content/ReviewFilter"
import { DateFilter } from "./content/DateFilter"
import { OnlyTopCoachCheckbox } from "./content/OnlyTopCoachCheckbox"
import { ResetFiltersButton } from "./content/ResetFiltersButton"
import {
  $mobileFiltersVisibility,
  changeMobileFiltersVisibility
} from "@/application/pages/search/content/mobile-tabs/mobile-tabs.model"
import { useStore } from "effector-react"
import close from "./images/close.svg"

type ModalTypes = {
  showOnMobile: boolean
}

const Modal = styled.div<ModalTypes>`
  width: 220px;
  border-left: 1px solid #efefef;
  background: #fff;
  @media screen and (max-width: 480px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => (props.showOnMobile ? `block` : `none`)};
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

export const Filters = () => {
  const showOnMobile = useStore($mobileFiltersVisibility)
  return (
    <Modal showOnMobile={showOnMobile}>
      <Container>
        <MobileClose onClick={() => changeMobileFiltersVisibility(false)} />
        <Header>Фильтры</Header>
        <PriceFilter />
        <ReviewFilter />
        <DateFilter />
        <OnlyTopCoachCheckbox />
        <ResetFiltersButton />
      </Container>
    </Modal>
  )
}
