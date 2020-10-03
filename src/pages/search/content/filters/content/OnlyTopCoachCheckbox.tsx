import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"
import { Checkbox } from "#/components/checkbox/Checkbox"
import { $searchPageQuery, addSearchPageQuery, removeSearchPageQuery } from "#/pages/search/coaches-search.model"
import { Icon } from "#/components/icon/Icon"

const Container = styled.div`
  padding-top: 42px;
  padding-bottom: 36px;
`

const TopCoachIcon = styled(Icon).attrs({ name: `top-coach` })`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-left: 7px;
  display: flex;
  align-items: center;
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
        <Text>
          <TopCoachIcon />
          Только топ коуч
        </Text>
      </Checkbox>
    </Container>
  )
}
