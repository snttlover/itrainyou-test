import * as React from "react"
import styled from "styled-components"

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  background: #449BD9;
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
    background: #3B8AC3;
  }
  &:disabled {
    background: #EFEFEF;
    color: #B3B3B3;
    pointer-events: none;
  }
`
