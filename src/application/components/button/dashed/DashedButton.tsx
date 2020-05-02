import * as React from "react"
import styled from "styled-components"
import { Button } from "../normal/Button";

export const DashedButton = styled(Button)`
  background: #fff;
  color: #4858CC;
  border: 1px solid #4858CC;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: none;
    border: 1px solid #3746B0;
    color: #3746B0;
    background: #fff;
  }
  &:disabled {
    background: #fff;
    color: #B3B3B3;
    border: 1px solid #EFEFEF;
    pointer-events: none;
  }
`
