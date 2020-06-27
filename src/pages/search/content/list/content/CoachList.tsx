import * as React from "react"
import styled from "styled-components"
import { $coachesList } from "@/pages/search/coaches-search.model"
import { CoachCard } from "@/components/coach-card/CoachCard"
import { useStore } from "effector-react/ssr"

const Container = styled.div``

const StyledCoachCard = styled(CoachCard)`
  margin-bottom: 24px;
`

export const CoachList = () => {
  const list = useStore($coachesList).map(coach => <StyledCoachCard key={coach.id} coach={coach} />)

  return <Container>{list}</Container>
}
