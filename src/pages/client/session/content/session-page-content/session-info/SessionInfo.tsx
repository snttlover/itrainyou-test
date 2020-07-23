import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

export const SessionInfo = ({ className }: { className?: string }) => (
  <Container className={className}>
    <Date>25 октября в 15:00</Date>
    <Row>
      <Label>Стоимость</Label>
      <Value>1200</Value>
    </Row>
    <Row>
      <Label>Длительность</Label>
      <Value>120 мин.</Value>
    </Row>
    <Status>Сессия прошла</Status>
  </Container>
)

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #dbdee0;
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
  margin-top: 24px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;

  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #9aa0a6;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
    margin-top: 16px;
    margin-bottom: 0;
  `}
`
