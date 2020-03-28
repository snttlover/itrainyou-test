import { useEvent, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { $searchPageQuery, addSearchPageQuery, removeSearchPageQuery } from "@/application/pages/search/coaches-search.model"

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
  const queries = useStore($searchPageQuery)
  const _addSearchPageQuery = useEvent(addSearchPageQuery)
  const _removeSearchPageQuery = useEvent(removeSearchPageQuery)
  const value = !!queries.is_top_coach

  const change = (value: boolean) => {
    if (value) {
      _addSearchPageQuery({ is_top_coach: value })
    } else {
      _removeSearchPageQuery([`is_top_coach`])
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
