import { MediaRange } from "@app/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import arrow from "./arrow.svg"

const Container = styled.div`
  display: flex;
  align-items: center;
`

const CircleBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  position: relative;

  border-radius: 12px;
  background: linear-gradient(0.125turn, #9f8dc1, #a3cff3);

  ${MediaRange.greaterThan("mobile")`  
    width: 40px;
    height: 40px;  
    border-radius: 20px;
  `}
`

type CircleProps = {
  isActive?: boolean
}

const Circle = styled.div<CircleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  position: relative;
  box-sizing: border-box;

  color: #544274;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  border-radius: 12px;

  background: ${props => (props.isActive ? "#9F8DC1" : "#fff")};

  ${MediaRange.greaterThan("mobile")`  
    border-radius: 20px;
    font-size: 20px;
    line-height: 26px;
  `}
`

const Arrow = styled.img.attrs({ src: arrow })`
  width: 16px;
  height: 16px;
  ${MediaRange.greaterThan("mobile")`  
    width: 24px;
    height: 24px;
  `}
`

export type StepId = string
export type StepProps = {
  id: StepId
  children: React.ReactNode
  active?: boolean
  isLast?: boolean
}

export const Step = (props: StepProps) => (
  <Container>
    <CircleBorder>
      <Circle isActive={props.active}>{props.children}</Circle>
    </CircleBorder>
    {!props.isLast && <Arrow />}
  </Container>
)
