import { $clientData } from "@/pages/coach/client/client-page.model"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { useStore } from "effector-react"
import * as React from "react"

const Container = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  transform: translate(100%, 0);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${MediaRange.lessThan("tablet")`
    right: unset;
    top: 10px;
    left: 0;
    transform: unset;
    flex-direction: row;
    height: auto;
    width: 100%;
  `}

  ${MediaRange.lessThan("mobile")`
    right: unset;
    top: 10px;
    left: 0;
    transform: unset;
    flex-direction: row;
    height: auto;
    width: 100%;
  `}
`

const Tab = styled.div`
  width: 140px;
  height: 98px;
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

  ${MediaRange.lessThan("tablet")`
    
    flex-direction: row;
    margin-bottom: unset;
    margin-right: 12px;
    width: 100%;
    height: 58px;
    
    &:last-child {
      margin-right: 0;
    }
  `}

  ${MediaRange.lessThan("mobile")`
    
    flex-direction: column;
    margin-bottom: unset;
    margin-right: 12px;
    width: 100%;
    height: 58px;
    
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
  color: #ffffff;
  width: 91px;

  ${MediaRange.lessThan("tablet")`
    width: unset;
    
    font-size: 14px;
    line-height: 18px;
  `}

  ${MediaRange.lessThan("mobile")`
    width: unset;
    
    font-size: 14px;
    line-height: 18px;
  `}
`

const Counter = styled.div`
  font-family: Roboto;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #ffffff;
  ${MediaRange.lessThan("tablet")`
    margin-left: 24px;
    font-size: 20px;
    line-height: 26px;
  `}

  ${MediaRange.lessThan("mobile")`
    margin-left: 0;
    margin-top: 4px;
    font-size: 16px;
    line-height: 22px;
  `}
`

export const SessionsStats = () => {
  const profile = useStore($clientData)

  return (
    <Container>
      <Tab>
        <Title>???????????? ????????????????</Title>
        <Counter>{profile?.completedSessionsCount || 0}</Counter>
      </Tab>
      <Tab>
        <Title>?????????????? ????????????</Title>
        <Counter>{profile?.cancelledSessionsCount || 0}</Counter>
      </Tab>
    </Container>
  )
}
