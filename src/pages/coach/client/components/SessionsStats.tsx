import { $clientData } from "@/pages/coach/client/client-page.model"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { useStore } from "effector-react/ssr"
import * as React from "react"

const Container = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  transform: translate(50%, 0);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${MediaRange.lessThan(`mobile`)`
    right: unset;
    top: 30px;
    left: 0;
    transform: unset;
    flex-direction: row;
    height: auto;
    width: 100%;
  `}
`

const Tab = styled.div`
  width: 140px;
  height: 140px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }

  ${MediaRange.lessThan(`mobile`)`
    margin-bottom: unset;
    margin-right: 16px;
    width: 100px;
    height: 100px;
    
    &:last-child {
      margin-right: 0;
    }
  `}
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 16px;
  color: #ffffff;
  width: 91px;

  ${MediaRange.lessThan(`mobile`)`
    width: 74px;
    margin-bottom: 10px;
  `}
`

const Counter = styled.div`
  font-family: Roboto;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #ffffff;
  ${MediaRange.lessThan(`mobile`)`
     font-size: 28px;
     line-height: 26px;
  `}
`

export const SessionsStats = () => {
  const profile = useStore($clientData)

  return (
    <Container>
      <Tab>
        <Title>Сессий пройдено</Title>
        <Counter>{profile?.completedSessionsCount}</Counter>
      </Tab>
      <Tab>
        <Title>Отменил сессий</Title>
        <Counter>{profile?.cancelledSessionsCount}</Counter>
      </Tab>
    </Container>
  )
}
