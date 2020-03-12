import * as React from "react"
import styled from "styled-components"
import { useStore } from "effector-react/ssr"
import { $coachesList } from "@/application/pages/search/model.ts"
import { CoachCard } from "@/application/components/coach-card/CoachCard"

const Container = styled.div``

const StyledCoachCard = styled(CoachCard)`
  margin-bottom: 24px;
`

export const CoachList = () => {
  const coaches = useStore($coachesList)
  console.log(coaches)
  return (
    <Container>
      {coaches.map(coach => (
        <StyledCoachCard key={coach.id} coach={coach} />
      ))}
    </Container>
  )
}
