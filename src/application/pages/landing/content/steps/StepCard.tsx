import * as React from "react"
import styled from "styled-components"
import arrowImage from "./images/card-arrow.svg"

type StepCardTypes = {
  index: number
  text: string
}

const StyledCard = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-right: 68px;
    &:after {
      position: absolute;
      content: url("${arrowImage}");
      right: -56px;
      width: 44px;
      height: 44px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`

const Index = styled.div`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #544274;
  margin-bottom: 12px;
`

const Text = styled.div`
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
`

export const StepCard = (props: StepCardTypes) => (
  <StyledCard>
    <Index>{props.index}</Index>
    <Text>{props.text}</Text>
  </StyledCard>
)
