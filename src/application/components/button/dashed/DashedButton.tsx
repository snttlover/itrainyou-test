import * as React from "react"
import styled from "styled-components"
import { Button } from "../normal/Button"

type ButtonTypes = {
  "data-secondary"?: any
  slim?: boolean
}

export const DashedButton = styled(Button)<ButtonTypes>`
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};

  &[data-secondary="true"] {
    color: #7d36a8;
    border: 1px solid #7d36a8;

    &:active {
      border: 1px solid #75309e;
      color: #75309e;
    }
  }

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
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
