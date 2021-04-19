import * as React from "react"
import styled from "styled-components"
import spread from "./images/spread.svg"

const IconToolTip = styled.span`
  width: 136px;
  height: auto;
  position: absolute;
  z-index: 1;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  bottom: 80%;
  left: 50%;
  margin-left: -68px;
  display: none;

  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`

const Tooltip = styled.div`
  display: none;
  white-space: nowrap;
  background: #5b6670;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
`

const TooltipContent = styled.div`
  position: relative;
  padding: 4px;

  &:after {
    position: absolute;
    content: '';
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 6px;
    bottom: -5px;
    background: url('${spread}');
    background-size: cover;
  }
`

const Container = styled.div`
  position: relative;
  &:hover ${Tooltip} {
    display: block;
  }
`

type GrayTooltipTypes = {
  text: string
  children: React.ReactElement
}

export const GrayTooltip = (props: GrayTooltipTypes) => (
  <Container>
    <Tooltip>
      <TooltipContent>{props.text}</TooltipContent>
    </Tooltip>
    {props.children}
  </Container>
)
