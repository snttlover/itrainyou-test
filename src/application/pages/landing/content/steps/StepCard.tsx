import * as React from "react"
import styled from "styled-components"
import arrowImage from "./images/card-arrow.svg"
import arrowBottomImage from "./images/card-arrow-bottom.svg"

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
      content: "";
      right: -56px;
      width: 44px;
      height: 44px;
      top: 50%;
      background-image: url("${arrowImage}");
      transform: translateY(-50%);
      background-size: 100%;
    }
    
    
    @media screen and (max-width: 768px) {
      margin-right: 56px;
      &:after {
        width: 24px;
        height: 24px;
        right: -40px;
      }
    }
  }
  
  
  @media screen and (max-width: 565px) {
    width: 100%;
    margin-right: 0 !important;
    &:not(:last-child) {
      margin-bottom: 68px;
      &:after {
        right: unset;
        top: unset;
        left: 50%;
        transform: translateX(-50%);
        bottom: -49px;
        background-image: url("${arrowBottomImage}");
        background-size: 24px 24px;
        background-repeat: no-repeat;
      }
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
  @media screen and (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 4px;
  }
  @media screen and (max-width: 565px) {
    font-size: 20px;
    line-height: 26px;
  }
`

const Text = styled.div`
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
  @media screen and (max-width: 565px) {
    line-height: 16px;
  }
`

export const StepCard = (props: StepCardTypes) => (
  <StyledCard>
    <Index>{props.index}</Index>
    <Text>{props.text}</Text>
  </StyledCard>
)
