import * as React from "react"
import styled from "styled-components"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { useStoreMap } from "effector-react"
import { $searchPageQuery, addSearchPageQuery, removeSearchPageQuery } from "@app/pages/search/coaches-search.model"

const Container = styled.div`
  padding-top: 42px;
  padding-bottom: 36px;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-left: 7px;
`

export const OnlyTopCoachCheckbox = () => {
  const value = useStoreMap({
    store: $searchPageQuery,
    keys: [`is_top_coach`],
    fn: values => !!values.is_top_coach
  })
  const change = (value: boolean) => {
    if (value) {
      addSearchPageQuery({ is_top_coach: value })
    } else {
      removeSearchPageQuery([`is_top_coach`])
    }
  }

  return (
    <Container>
      <Checkbox value={value} onChange={change}>
        <Text>Только топ коуч</Text>
      </Checkbox>
    </Container>
  )
}
