import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"
import { Slider } from "@/components/slider/Slider"
import { declOfNum, DeclOfNumListType } from "@/lib/formatting/numerals"
import { $searchPageQuery, addSearchPageQuery } from "@/pages/search/coaches-search.model"

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

export const ReviewFilter = () => {
  const [min, max] = [1, 5]
  const stars: DeclOfNumListType = ["звезды", "звезд", "звезд"]

  const params = useStore($searchPageQuery)
  const _addSearchPageQuery = useEvent(addSearchPageQuery)
  const score = params.rating__gte ? +params.rating__gte : 0

  return (
    <Container>
      <Header>Оценка по отзывам</Header>
      <Text>
        От <Bold>{score}</Bold> {declOfNum(score, stars)}
      </Text>
      <Slider value={score} min={min} max={max} onChange={value => _addSearchPageQuery({ rating__gte: value })} />
      <RangeNumbers>
        <RangeNumber>{min} звезда</RangeNumber>
        <RangeNumber>{max} звезд</RangeNumber>
      </RangeNumbers>
    </Container>
  )
}
