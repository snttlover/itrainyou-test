import { Checkbox } from "@/old-components/checkbox/Checkbox"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Title = styled.h2<{ color: string }>`
  font-family: Roboto Slab;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: ${({color}) => color};
  
  ${MediaRange.greaterThan("mobile")`
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
  `}
`

const Block = styled.div<{ hoverColor: string }>`
  background: #FFFFFF;
  border-radius: 2px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({hoverColor}) => hoverColor};
  }
  
  ${Checkbox} {
    margin-top: 15px;
  }
  
  ${MediaRange.greaterThan("mobile")`
    ${Checkbox} {
      margin-top: 21px;
      & svg {
        width: 40px;
        height: 40px;
      }
    }
  `}
`

type UserTypeCardProps = {
  title: string
  color: string
  hoverColor: string
  selected: boolean
  onClick: () => void
}

export const UserTypeCard = styled(({ title, color, selected, ...props }: UserTypeCardProps) => (
  <Block {...props}>
    <Title color={color}>{title}</Title>
    <Checkbox color={color} value={selected} />
  </Block>
))``
