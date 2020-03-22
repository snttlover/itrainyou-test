import * as React from "react"
import styled from "styled-components"
import { Slider } from "@/application/components/slider/Slider"
import { declOfNum, DeclOfNumListType } from "@/application/lib/formatting/numerals"
import { useStoreMap } from "effector-react"
import { $searchPageQuery, addSearchPageQuery, DelayedNavigation } from "@app/pages/search/coaches-search.model"
import { useState } from "react"

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

const navigation = new DelayedNavigation()

export const ReviewFilter = () => {
  const [min, max] = [1, 5]
  const stars: DeclOfNumListType = ["звезды", "звезд", "звезд"]

  const score = useStoreMap({
    store: $searchPageQuery,
    keys: [`rating__gte`],
    fn: values => (values.rating__gte ? +values.rating__gte : 0)
  })

  const [scoreValue, changeScoreValue] = useState(score)

  const changeRating = (value: number) => {
    changeScoreValue(value)
    navigation.navigate({ rating__gte: value }, 500)
  }

  return (
    <Container>
      <Header>Оценка по отзывам</Header>
      <Text>
        От <Bold>{scoreValue}</Bold> {declOfNum(scoreValue, stars)}
      </Text>
      <Slider value={scoreValue} min={min} max={max} onChange={changeRating} />
      <RangeNumbers>
        <RangeNumber>1 звезда</RangeNumber>
        <RangeNumber>5 звезд</RangeNumber>
      </RangeNumbers>
    </Container>
  )
}
