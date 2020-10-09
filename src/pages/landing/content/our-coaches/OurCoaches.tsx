import { routeNames } from "@/pages/route-names"
import { Link } from "react-router-dom"
import { CoachCard } from "@/components/coach-card/CoachCard"
import * as React from "react"
import styled from "styled-components"
import { $coachesList } from "./model"
import { useStore } from "effector-react/ssr"
import bg from "../../assets/our-coaches-bg.svg"

const OurCoachesContainer = styled.div`
  position: relative;
`

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto 100px;
  padding: 50px 0;

  @media screen and (max-width: 680px) {
    padding-right: 20px;
    padding-left: 20px;
  }
  @media screen and (max-width: 480px) {
    padding: 0px 12px;
  }
`

const Bg = styled.div`
  background-image: url(${bg});
  background-repeat: repeat-x;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: -80px;
  left: 0;
  width: 100%;
  height: 120%;
`

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #424242;
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

const Description = styled.div`
  margin-top: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #4858cc;
`

const CoachList = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  margin: 40px auto;

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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 145px;
  height: 26px;
  background: #4858cc;
  border-radius: 32px;

  margin: 0 auto;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;

  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

export const OurCoaches = () => {
  const coaches = useStore($coachesList)

  return (
    <OurCoachesContainer>
      <Bg />
      <Container>
        <Title>Ваш личный помощник на связи из любой точки мира</Title>
        <Description>Найдите подходящего именно вам!</Description>
        <CoachList>
          {coaches.map(coach => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </CoachList>
        <ShowMoreButton to={routeNames.search()}>Загрузить еще</ShowMoreButton>
      </Container>
    </OurCoachesContainer>
  )
}
