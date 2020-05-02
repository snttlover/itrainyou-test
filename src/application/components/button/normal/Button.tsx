import * as React from "react"
import styled from "styled-components"

export const Button = styled.button`
  padding: 8px 24px;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  background: #4858CC;
  border-radius: 32px;
  border: none;
  outline: none;
  color: #FFFFFF;
  cursor: pointer;
  
  transition: all 200ms ease;
  
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: none;
    background: #3746B0;
  }
  &:disabled {
    background: #EFEFEF;
    color: #9AA0A6;
    pointer-events: none;
  }
`
