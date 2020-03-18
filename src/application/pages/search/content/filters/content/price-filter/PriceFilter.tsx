import { RangeSlider } from "@app/components/slider/RangeSlider"
import { formatCurrency } from "@app/lib/formatting/currency"
import * as React from "react"
import styled from "styled-components"
import { useStore, useStoreMap } from "effector-react"
import { debounce } from "@app/lib/helpers/debounce"
import { $searchPageQuery, addSearchPageQuery } from "@app/pages/search/coaches-search.model"
import { $maxPrice } from "@app/pages/search/content/filters/content/price-filter/price-filter.model"

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
  color: #424242;
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

  const [min, max] = [0, maxPrice]

  const start = useStoreMap({
    store: $searchPageQuery,
    keys: [`price__gte`],
    fn: values => (values.price__gte ? +values.price__gte : 0)
  })

  const end = useStoreMap({
    store: $searchPageQuery,
    keys: [`price__lte`],
    fn: values => (values.price__lte ? +values.price__lte : maxPrice)
  })

  const change = (value: [number, number]) => {
    addSearchPageQuery({
      price__gte: value[0],
      price__lte: value[1]
    })
  }

  return (
    <Container>
      <Header>Цена</Header>
      <Text>
        от <Bold>{formatCurrency(start)}</Bold> до <Bold>{formatCurrency(end)}</Bold> руб.
      </Text>
      <RangeSlider value={[start, end]} min={min} max={max} onChange={change} />
      <RangeNumbers>
        <RangeNumber>{formatCurrency(min)} руб.</RangeNumber>
        <RangeNumber>{formatCurrency(max)} руб.</RangeNumber>
      </RangeNumbers>
    </Container>
  )
}
