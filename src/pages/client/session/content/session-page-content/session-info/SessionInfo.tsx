import React from "react"
import styled from "styled-components"
import { MediaRange } from "#/lib/responsive/media"

type SessionInfoProps = {
  duration: string
  cost: string | number
  date: string
  isOver: boolean
  className?: string
}

export const SessionInfo = (props: SessionInfoProps) => (
  <Container className={props.className}>
    <Date>{props.date}</Date>
    <Row>
      <Label>Стоимость</Label>
      <Value>{props.cost}</Value>
    </Row>
    <Row>
      <Label>Длительность</Label>
      <Value>{props.duration}</Value>
    </Row>
    {props.isOver && <Status>Сессия прошла</Status>}
  </Container>
)

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #dbdee0;
  &:last-child {
    border-bottom: 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  position: relative;
  background: #ffffff;
  border-radius: 2px;
  ${MediaRange.lessThan(`tablet`)`
    margin-top: 24px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 12px;
  `}
`

const Date = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  border-bottom: 1px solid #dbdee0;
  padding-bottom: 24px;
  text-align: center;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 22px;
    padding-bottom: 20px;
  `}
`

const Label = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.primary};
  flex: 1;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
  `}
`

const Value = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
  ${MediaRange.lessThan(`mobile`)`
    font-weight: 500;
    font-size: 14px;
  `}
`

const Status = styled.div`
  padding-top: 24px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;

  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #9aa0a6;

  border-top: 1px solid #dbdee0;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
    padding-top: 16px;
    margin-bottom: 0;
  `}
`

export const TabletSessionInfo = styled(SessionInfo)`
  display: none;
  ${MediaRange.lessThan(`tablet`)`
    display: flex;
  `}
`

