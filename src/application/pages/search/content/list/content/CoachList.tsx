import * as React from "react"
import styled from "styled-components"
import { $coachesList } from "@/application/pages/search/coaches-search.model"
import { CoachCard } from "@/application/components/coach-card/CoachCard"
import { useList } from "effector-react"

const Container = styled.div``

const StyledCoachCard = styled(CoachCard)`
  margin-bottom: 24px;
`

export const CoachList = () => {
  const list = useList($coachesList, coach => <StyledCoachCard coach={coach} />)

  return <Container>{list}</Container>
}
