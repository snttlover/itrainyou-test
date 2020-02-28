import { CoachCard } from "@/application/components/coach-card/CoachCard"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import * as React from "react"
import styled from "styled-components"
import { $coachesList } from "./model"
import { useStore } from "effector-react/ssr"

const Container = styled(LandingPageContainer)`
  width: 640px;
  display: flex;
  flex-direction: column;
  
  ${CoachCard} {
    margin-top: 24px;
  }
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #424242;
  margin-bottom: 24px;
`

const ShowMoreButton = styled.a`
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-top: 24px;
  color: #544274;
  align-self: flex-end;
`

export const OurCoaches = () => {
  const coaches = useStore($coachesList)

  return (
    <Container>
      <Title>Наши коучи</Title>
      {coaches.map(coach => (
        <CoachCard
          key={coach.id}
          coach={coach}
        />
      ))}
      <ShowMoreButton>Показать еще</ShowMoreButton>
    </Container>
  )
}
