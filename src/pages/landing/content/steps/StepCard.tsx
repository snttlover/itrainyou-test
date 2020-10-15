import * as React from "react"
import styled from "styled-components"
import arrowImage from "./images/card-arrow.svg"
import arrowBottomImage from "./images/card-arrow-bottom.svg"

type StepCardTypes = {
  index: number
  text: string
  onClick: (index: number) => void
  selected?: boolean
}

const StyledCard = styled.div`
  position: relative;
  cursor:pointer;

  &:not(:last-child) {
    margin-right: 68px;
    &:after {
      position: absolute;
      content: "";
      right: -56px;
      width: 44px;
      height: 44px;
      top: 20%;
      background-image: url("${arrowImage}");
      transform: translateY(-50%);
      background-size: 100%;
    }
    
    
    @media screen and (max-width: 768px) {
      width: 128px;
      margin-right: 48px;
      &:after {
        width: 24px;
        height: 24px;
        right: -40px;
      }
    }
  }
  
  
  @media screen and (max-width: 565px) {
    pointer-events: none;
    width: 129px;
    margin-right: 0 !important;
    &:not(:last-child) {
      margin-bottom: 68px;
      &:after {
        right: unset;
        top: unset;
        left: 50%;
        transform: translateX(-50%);
        bottom: -40px;
        background-image: url("${arrowBottomImage}");
        background-size: 24px 24px;
        background-repeat: no-repeat;
      }
    }
  }
`

const Index = styled.div<{ selected?: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 26px;
  color: ${({ selected }) => (selected ? "#4858cc" : "#5B6670")};
  margin-bottom: 24px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 40px;
    line-height: 26px;
  }
  @media screen and (max-width: 565px) {
    font-size: 40px;
    line-height: 26px;
    margin-bottom: 12px;
    color: #5b6670;
  }
`

const Text = styled.div<{ selected?: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: ${({ selected }) => (selected ? "#4858cc" : "#5B6670")};
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
  @media screen and (max-width: 565px) {
    font-size: 16px;
    line-height: 22px;
    color: #5b6670;
  }
`

export const StepCard = (props: StepCardTypes) => (
  <StyledCard onClick={() => props.onClick(props.index)}>
    <Index selected={props.selected}>0{props.index}</Index>
    <Text selected={props.selected}>{props.text}</Text>
  </StyledCard>
)
