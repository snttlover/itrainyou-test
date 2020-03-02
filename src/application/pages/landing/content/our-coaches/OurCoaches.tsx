import { CoachCard } from "@/application/components/coach-card/CoachCard"
import { MediaRange } from "@/application/lib/media/media"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import * as React from "react"
import styled from "styled-components"
import { $coachesList } from "./model"
import { useStore } from "effector-react/ssr"
import tabletka from "./tabletka.svg"

const Container = styled(LandingPageContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 12px;
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 12px;
`

const CoachList = styled.div`
  display: flex;
  flex-direction: column;
  
  ${CoachCard} {
    margin-top: 12px;
    &:first-of-type {
      margin-top: 0;
    }
  }
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

const Tabletka = styled.div`
  position: absolute;
  z-index: -1;
  background: url("${tabletka}");
  background-size: cover;
  background-position: center;
  
  ${MediaRange.lessThan('tablet')`    
    width: 290px;
    height: 780px;
    top: 41%;
    left: 0;
    
    transform: rotateZ(58deg) translate(-68%,-42%);
  `}
`

export const OurCoaches = () => {
  const coaches = useStore($coachesList)

  return (
    <Container>
      <Tabletka />
      <Title>Наши коучи</Title>
      <CoachList>
        {coaches.map(coach => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </CoachList>
      <ShowMoreButton>Показать еще</ShowMoreButton>
    </Container>
  )
}
