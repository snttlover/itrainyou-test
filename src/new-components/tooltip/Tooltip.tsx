import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Icon } from "@/old-components/icon/Icon"

const TooltipContainer = styled.div<{isLaptopHidden?: boolean}>`
  display: ${({ isLaptopHidden }) => isLaptopHidden ? "none" : "flex"};
  flex-direction: column;
  position: absolute;
  transform: translate(-80%, -100%);
  align-items: flex-end;
  visibility: hidden;
  margin: -5px 0 0 10px;
  ${MediaRange.greaterThan("desktop")`
    transform: translate(-50%, -100%);
    align-items: center;
    svg {
      margin: -1px 0 0 0;
    }
  `}

  ${MediaRange.greaterThan("laptop")`
    display: flex;
  `}
`

const TooltipWrapper = styled.div`
  z-index: 1;
  &:hover ${TooltipContainer} {
    visibility: visible;
  }
`

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

const TooltipArrow = styled(Icon).attrs({ name: "tooltip-arrow" })`
  width: 20px;
  height: 12px;
  margin: -1px 35px 0 -35px;
`


type TooltipWrapperTypes = {
  children: React.ReactChild
  text: string
  isLaptopHidden?: boolean
}

export const Tooltip:React.FC<TooltipWrapperTypes> = (props: TooltipWrapperTypes) => (
  <TooltipWrapper>
    <TooltipContainer isLaptopHidden={props.isLaptopHidden}>
      <TooltipText>
        {props.text}
      </TooltipText>
      <TooltipArrow />
    </TooltipContainer>

    {props.children}
  </TooltipWrapper>
)
