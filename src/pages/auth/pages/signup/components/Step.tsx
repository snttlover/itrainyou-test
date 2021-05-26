import { Icon } from "@/oldcomponents/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  width: 16px;
  height: 16px;
  transform: rotate(-90deg);
  margin-left: 5px;
  ${MediaRange.greaterThan("mobile")`  
    margin-left: 15px;
    width: 24px;
    height: 24px;
  `}
`

const StepDone = styled(Icon).attrs({ name: "step-done" })`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

const Container = styled.div<{active?: boolean}>`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Roboto Slab;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-left: 5px;
  ${Arrow} {
    fill: #fff;
  }
  
  ${MediaRange.greaterThan("mobile")`  
    margin-left: 15px;    
  `}
`

const Number = styled.div`
  width: 24px;
  line-height: 24px;
  border-radius: 50%;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
  color: #783D9D;
  font-weight: 700;
  margin-right: 8px;
`

const Mobile = styled.div`
  display: flex;
  ${MediaRange.lessThan("mobile")`  
    display: none    
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
  <Container active={props.active}>
    {props.active ?  <StepDone /> : <Number>{props.id}</Number>}
    <Mobile>{props.children}</Mobile>
    {!props.isLast && <Arrow />}
  </Container>
)
