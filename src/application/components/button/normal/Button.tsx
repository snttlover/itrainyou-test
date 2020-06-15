import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/application/lib/responsive/media"

type ButtonTypes = {
  "data-secondary"?: any
  "data-slim"?: any
}

export const Button = styled.button<ButtonTypes>`
  padding: 4px 24px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  background: ${props => props.theme.colors.primary};
  border-radius: 32px;
  border: none;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  
  &[data-slim="true"] {
   padding: 4px 24px;
  }

  &[data-secondary="true"] {
    background: #7d36a8;
    &:active {
      background: #75309e;
    }
  }

  transition: all 200ms ease;
  
  ${MediaRange.lessThan(`tablet`)`
    padding: 7px 24px;
    &[data-slim="true"] {
      padding: 4px 24px;
    }
  `}

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: none;
    background: ${props => props.theme};
  }
  &:disabled {
    background: #efefef;
    color: #9aa0a6;
    pointer-events: none;
  }
`
