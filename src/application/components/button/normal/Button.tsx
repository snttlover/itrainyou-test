import * as React from "react"
import styled from "styled-components"

type ButtonTypes = {
  'data-secondary': any,
  slim? : boolean
}

export const Button = styled.button<ButtonTypes>`
  padding: ${props => props.slim ? `4px` : `8px `} 24px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  background: ${props => props.theme.colors.primary};
  border-radius: 32px;
  border: none;
  outline: none;
  color: #FFFFFF;
  cursor: pointer;

  [data-secondary] {
    background: #7D36A8;
    &:active {
      background: #75309E;
    }
  }
  
  transition: all 200ms ease;
  
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: none;
    background: ${props => props.theme};
  }
  &:disabled {
    background: #EFEFEF;
    color: #9AA0A6;
    pointer-events: none;
  }
`
