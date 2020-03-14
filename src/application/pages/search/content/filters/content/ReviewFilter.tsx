import * as React from "react"
import styled from "styled-components"
import { Slider } from "@/application/components/slider/Slider"
import { useState } from "react"
import { declOfNum, DeclOfNumListType } from "@/application/lib/formatting/numerals"

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

export const ReviewFilter = () => {
  const [min, max] = [1, 5]
  const stars: DeclOfNumListType = ["звезды", "звезд", "звезд"]
  const [score, changeScore] = useState(2)

  return (
    <Container>
      <Header>Оценка по отзывам</Header>
      <Text>
        От <Bold>{score}</Bold> {declOfNum(score, stars)}
      </Text>
      <Slider value={score} min={min} max={max} onChange={changeScore} />
      <RangeNumbers>
        <RangeNumber>1 звезда</RangeNumber>
        <RangeNumber>5 звезд</RangeNumber>
      </RangeNumbers>
    </Container>
  )
}
