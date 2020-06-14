import * as React from "react"
import styled from "styled-components"
import { Button } from "../normal/Button"

export const DashedButton = styled(Button)`
  background: transparent;

  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};  

  &[data-secondary="true"] {
    background: transparent;
    color: #7d36a8;
    border: 1px solid #7d36a8;

    &:active {
      background: transparent;
      border: 1px solid #75309e;
      color: #75309e;
    }
  }

  &:active {
    box-shadow: none;
    border: 1px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    background: transparent;
  }
  &:disabled {
    background: transparent;
    color: #9aa0a6;
    border: 1px solid #efefef;
    pointer-events: none;
  }
`
