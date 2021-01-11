import { Icon } from "@/components/icon/Icon"
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

const Container = styled.div<{active?: boolean}>`
  display: flex;
  align-items: center;
  color: ${({active}) => active ? "#919BE0" : "#fff"};
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  margin-left: 5px;
  ${Arrow} {
    fill: ${({active}) => active ? "#919BE0" : "#fff"};
  }
  
  ${MediaRange.greaterThan("mobile")`  
    margin-left: 15px;    
    font-size: 16px;
    line-height: 21px;
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
    шаг {props.children}
    {!props.isLast && <Arrow />}
  </Container>
)
