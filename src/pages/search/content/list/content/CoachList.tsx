import * as React from "react"
import styled from "styled-components"
import { $coachesList } from "@/pages/search/coaches-search.model"
import { CoachCard } from "@/oldcomponents/coach-card/CoachCard"
import { useStore } from "effector-react"

const Container = styled.div``

const StyledCoachCard = styled(CoachCard)`
  margin-bottom: 24px;
`

type CoachListProps = {
  freeSessions?: boolean
}

export const CoachList = ({ freeSessions }: CoachListProps) => {
  const list = useStore($coachesList).map(coach => <StyledCoachCard key={coach.id} coach={coach} freeSessions={freeSessions} />)
  return <Container>{list}</Container>
}
