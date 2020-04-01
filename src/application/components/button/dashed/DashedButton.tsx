import * as React from "react"
import styled from "styled-components"
import { Button } from "../normal/Button";

export const DashedButton = styled(Button)`
  background: #fff;
  color: #449BD9;
  border: 1px solid #449BD9;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: none;
    border: 1px solid #3B8AC3;
    background: #fff;
  }
  &:disabled {
    color: #B3B3B3;
    border: 1px solid #EFEFEF;
    pointer-events: none;
  }
`
