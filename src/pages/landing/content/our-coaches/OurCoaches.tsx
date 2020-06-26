import { routeNames } from "@/pages/route-names"
import { Link } from "react-router-dom"
import { CoachCard } from "@/components/coach-card/CoachCard"
import * as React from "react"
import styled from "styled-components"
import { $coachesList } from "./model"
import { useStore } from "effector-react/ssr"
import tabletka from "./images/tabletka.svg"

const Container = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 90px;

  @media screen and (max-width: 680px) {
    padding-right: 20px;
    padding-left: 20px;
  }
  @media screen and (max-width: 480px) {
    padding: 0px 12px;
  }
`

const Title = styled.h3`
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 24px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 28px;
    line-height: 44px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 12px;
  }
`

const CoachList = styled.div`
  display: flex;
  flex-direction: column;

  ${CoachCard} {
    display: inline-table;
    margin-bottom: 24px;
    &:last-of-type {
      margin-bottom: 0;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 12px;
    }
  }
`

const ShowMoreButton = styled(Link)`
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-top: 24px;
  color: #544274;
  align-self: flex-end;
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const Tabletka = styled.img.attrs({ src: tabletka })`
  position: absolute;
  z-index: -1;
  background-size: cover;
  height: 884.04px;
  width: 337.94px;
  transform: translateX(-50%) rotate(-120deg);
  left: 50%;
  top: -150px;

  @media screen and (max-width: 480px) {
    height: 517px;
    width: 197.63px;
    top: -50px;
    transform: translateX(-50%) rotate(-140deg);
  }
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
      <ShowMoreButton to={routeNames.search()}>Показать еще</ShowMoreButton>
    </Container>
  )
}
