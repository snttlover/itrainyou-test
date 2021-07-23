import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

const TooltipText = styled.span`
  background: #FFFFFF;
  border-radius: 8px;
  padding: 12px;
  white-space: nowrap;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08), 0px 0px 4px rgba(0, 0, 0, 0.16), 0px 6px 18px -6px rgba(0, 0, 0, 0.04);
`

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(-80%, -100%);
  align-items: flex-end;
  visibility: hidden;
  margin: -5px 0 0 10px;
  > svg {
    margin: 0 35px 0 -35px;
  }
  ${MediaRange.greaterThan("desktop")`
    transform: translate(-50%, -100%);
    align-items: center;
    svg {
      margin: 0;
    }
  `}
`
const TooltipWrapper = styled.div`
  z-index: 1;
  &:hover ${TooltipContainer} {
    visibility: visible;
  }
`

type TooltipWrapperTypes = {
  children: React.ReactChild
  text: string
}

export const Tooltip:React.FC<TooltipWrapperTypes> = (props: TooltipWrapperTypes) => (
  <TooltipWrapper>
    <TooltipContainer>
      <TooltipText>
        {props.text}
      </TooltipText>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.23178 11.0781L0 0H20L10.7682 11.0781C10.3684 11.5579 9.63157 11.5579 9.23178 11.0781Z" fill="white"/>
      </svg>
    </TooltipContainer>

    {props.children}
  </TooltipWrapper>
)
