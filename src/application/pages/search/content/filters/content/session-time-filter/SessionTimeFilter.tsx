import * as React from "react"
import styled from "styled-components"
import { useStore } from "effector-react"
import { $searchPageQuery, addSearchPageQuery } from "@/application/pages/search/coaches-search.model"
import {Checkbox} from "@/application/components/checkbox/Checkbox"

const Container = styled.div`
  padding-top: 16px;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 8px;
`

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 21px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`

export const SessionTimeFilter = () => {
  const params = useStore($searchPageQuery)

  const selected = (params.session_duration_types || ``).split(`,`)

  const times = [
    {
      key: `D30`,
      text: `30 мин`
    },
    {
      key: `D45`,
      text: `45 мин`
    },
    {
      key: `D60`,
      text: `60 мин`
    },
    {
      key: `D90`,
      text: `90 мин`
    }
  ]

  const checkboxes = times.map(time => ({
    ...time,
    selected: selected.indexOf(time.key) !== -1
  }))


  const updateFilters = () => {
    addSearchPageQuery({
      session_duration_types: checkboxes.filter(box => box.selected).map(box => box.key).join(`,`)
    })
  }

  return (
    <Container>
      <Header>Длительность сессии</Header>
      {
        checkboxes.map(time => (<StyledCheckbox key={time.key} value={time.selected} onChange={updateFilters}>{time.text}</StyledCheckbox>))
      }
    </Container>
  )
}
