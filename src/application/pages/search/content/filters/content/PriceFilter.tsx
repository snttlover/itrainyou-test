import * as React from "react"
import styled from "styled-components"
import { RangeSlider } from "@/application/components/slider/RangeSlider"
import { useEffect, useState } from "react"

const Container = styled.div`
  padding-top: 16px;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 22px;
`

const Text = styled.div`
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
  const [min, max] = [0, 60000]
  const [start, changeStart] = useState(1200)
  const [end, changeEnd] = useState(10000)

  const change = (value: [number, number]) => {
    changeStart(value[0])
    changeEnd(value[1])
  }

  return (
    <Container>
      <Header>Цена</Header>
      <Text>
        от <Bold>{start.toLocaleString()}</Bold> до <Bold>{end.toLocaleString()}</Bold> руб.
      </Text>
      <RangeSlider value={[start, end]} min={min} max={max} onChange={change} />
      <RangeNumbers>
        <RangeNumber>{min.toLocaleString()} руб.</RangeNumber>
        <RangeNumber>{max.toLocaleString()} руб.</RangeNumber>
      </RangeNumbers>
    </Container>
  )
}
