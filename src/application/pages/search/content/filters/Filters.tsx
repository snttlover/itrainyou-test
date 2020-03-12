import * as React from "react"
import styled from "styled-components"
import { PriceFilter } from "./content/PriceFilter"
import { ReviewFilter } from "./content/ReviewFilter"
import { DateFilter } from "./content/DateFilter"
import { OnlyTopCoachCheckbox } from "./content/OnlyTopCoachCheckbox"
import { ResetFiltersButton } from "./content/ResetFiltersButton"

const Container = styled.div`
  width: 220px;
  padding: 12px;
  border-left: 1px solid #efefef;
`

const Header = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`

export const Filters = () => (
  <Container>
    <Header>Фильтры</Header>
    <PriceFilter />
    <ReviewFilter />
    <DateFilter />
    <OnlyTopCoachCheckbox />
    <ResetFiltersButton />
  </Container>
)
