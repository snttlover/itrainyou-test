import * as React from "react"
import styled from "styled-components"
import { Button } from "../normal/Button";

export const DashedButton = styled(Button)`
  background: transparent;
  color: ${({secondary}) => secondary ? '#7D36A8' : '#4858CC'};
  border: 1px solid ${({secondary}) => secondary ? '#7D36A8' : '#4858CC'};

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: none;
    border: 1px solid ${({secondary}) => secondary ? '#75309E' : '#3746B0'};
    color: ${({secondary}) => secondary ? '#75309E' : '#3746B0'};
    background: transparent;
  }
  &:disabled {
    background: transparent;
    color: #9AA0A6;
    border: 1px solid #EFEFEF;
    pointer-events: none;
  }
`
