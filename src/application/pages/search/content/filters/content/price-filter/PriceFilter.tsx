import { RangeSlider } from "@/application/components/slider/RangeSlider"
import { formatCurrency } from "@/application/lib/formatting/currency"
import * as React from "react"
import styled from "styled-components"
import { useEvent, useStore } from "effector-react"
import { $searchPageQuery, addSearchPageQuery } from "@/application/pages/search/coaches-search.model"
import { $maxPrice } from "./price-filter.model"

const Container = styled.div`
  padding-top: 16px;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 22px;
`

const Text = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
`

const Bold = styled.div`
  font-weight: bold;
  display: inline;
`

const RangeNumbers = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 16px;
  color: #b3b3b3;
`

const RangeNumber = styled.div``

export const PriceFilter = () => {
  const maxPrice = useStore($maxPrice)
  const params = useStore($searchPageQuery)

  const start = params.price__gte ? +params.price__gte : 0
  const end = params.price__lte ? +params.price__lte : maxPrice

  return (
    <Container>
      <Header>Цена</Header>
      <Text>
        от <Bold>{formatCurrency(start)}</Bold> до <Bold>{formatCurrency(end)}</Bold> руб.
      </Text>
      <RangeSlider
        value={[start, end]}
        min={0}
        max={maxPrice}
        onChange={([price__gte, price__lte]) => addSearchPageQuery({ price__gte, price__lte })}
      />
      <RangeNumbers>
        <RangeNumber>{formatCurrency(0)} руб.</RangeNumber>
        <RangeNumber>{formatCurrency(maxPrice)} руб.</RangeNumber>
      </RangeNumbers>
    </Container>
  )
}
