import * as React from "react"
import styled from "styled-components"
import { useEvent, useList, useStore } from "effector-react"
import {Checkbox} from "@/application/components/checkbox/Checkbox"
import { $priceFilters, toggleFilter } from "@/application/pages/search/content/filters/content/session-time-filter/session-price-filter.model"

const Container = styled.div`
  padding-top: 16px;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 8px;
`

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 21px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`

export const SessionTimeFilter = () => {
  const toggle = useEvent(toggleFilter)
  return (
    <Container>
      <Header>Длительность сессии</Header>
      {
        useList($priceFilters, filter => (
          <StyledCheckbox value={filter.selected} onChange={() => toggle(filter.key)}>{filter.text}</StyledCheckbox>
        ))
      }
    </Container>
  )
}
