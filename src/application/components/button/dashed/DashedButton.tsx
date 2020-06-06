import * as React from "react"
import styled from "styled-components"
import { Button } from "../normal/Button";


type ButtonTypes = {
  'data-secondary': any,
  slim? : boolean
}


export const DashedButton = styled(Button)<ButtonTypes>`
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};

  [data-secondary] {
    color: #7D36A8;
    border: 1px solid #7D36A8;
    
    &:active {
      border: 1px solid #75309E;
      color: #75309E;
    }
  }

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
    background: transparent;
  }
  &:disabled {
    background: transparent;
    color: #9AA0A6;
    border: 1px solid #EFEFEF;
    pointer-events: none;
  }
`
