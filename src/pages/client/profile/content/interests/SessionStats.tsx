import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { $pageProfile } from "@/pages/client/profile/profile-page.model"
import { useStore } from "effector-react"
import * as React from "react"

const Container = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  left: 87%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

   ${MediaRange.lessThan("tablet")`
    height: 80%;
    left: 0;
    margin-top: 0;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    max-width: 650px;
  `}
    
  ${MediaRange.lessThan("mobile")`
    left: 0;
    position: relative;
    flex-direction: column;
    margin-top: 32px;
    margin-bottom: 16px;
    height: auto;
    width: 100%;
  `}
`

const Tab = styled.div`
  width: 140px;
  height: 140px;
  align-items: center;
  justify-content: center;
  background: #4858cc;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
    
    ${MediaRange.lessThan(`tablet`)`
    margin-bottom: unset;
    margin-right: unset;
    width: 48%;
    height: 84px;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  `}
    
  ${MediaRange.lessThan(`mobile`)`
    margin-bottom: unset;
    width: 100%;
    height: 44px;
    justify-content: space-between;
    &:last-child {
    margin-top: 8px;
  }
  `}
`

const Title = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 16px;
  color: #ffffff;
  width: 91px;
    
    ${MediaRange.lessThan(`tablet`)`
    margin-bottom: unset;
    width: 150px;
  `}
    
  ${MediaRange.lessThan(`mobile`)`
    margin-left: 12px;
    width: 120px;
    line-height: 18px;
    weight: 400;
    font-size: 14px;
    text-align: left;
  `}
`

const Counter = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #ffffff;
  ${MediaRange.lessThan(`mobile`)`
     font-size: 28px;
     line-height: 26px;
     margin-right: 12px;
  `}
`

export const SessionStats = () => {
  const profile = useStore($pageProfile)

  return (
    <Container>
      <Tab>
        <Title>Сессий пройдено</Title>
        <Counter>{profile?.completedSessionsCount}</Counter>
      </Tab>
      <Tab>
        <Title>Всего часов</Title>
        <Counter>{profile?.spentHoursCount}</Counter>
      </Tab>
    </Container>
  )
}
