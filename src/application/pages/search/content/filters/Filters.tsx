import * as React from "react"
import styled from "styled-components"
import {PriceFilter} from "./content/PriceFilter"

const Container = styled.div`
  width: 220px;
  padding: 12px 0 12px 12px;
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
  </Container>
)
