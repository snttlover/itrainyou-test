import * as React from "react"
import styled from "styled-components"
import mobileActiveButton from "@/pages/landing/content/platform-advantages/images/mobile-advantage-slider-button-active.svg"
import mobileButton from "@/pages/landing/content/platform-advantages/images/mobile-advantage-slider-button.svg"
import { Dispatch, SetStateAction } from "react"

const AdvantagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  @media screen and (max-width: 1000px) {
    position: absolute;
    bottom: -50px;
  }
  @media screen and (max-width: 638px) {
    position: relative;
    width: 100%;
    flex-direction: row;
    display: flex;
    justify-content: center;
    bottom: unset;
    margin-top: 20px;
  }
`

const AdvantageText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  @media screen and (max-width: 638px) {
    display: none;
  }
`

type AdvantageTypes = {
  isActive?: boolean
}

const Advantage = styled.div<AdvantageTypes>`
  cursor: pointer;
  margin-bottom: 26px;
  color: ${props => (props.isActive ? `#544274` : `#3B8AC3`)};
  text-decoration: ${props => (props.isActive ? `underline` : `none`)};
  position: relative;

  @media screen and (max-width: 638px) {
    margin-bottom: 0;
    width: 10px;
    height: 10px;
    position: relative;
    // mobile button
    &:after {
      content: "";
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("${props => (props.isActive ? mobileActiveButton : mobileButton)}") no-repeat;
    }
  }
`

type AdvantagesListItemType = {
  title: string
}

type AdvantagesListTypes = {
  list: AdvantagesListItemType[]
  current: number
  changeIndex: Dispatch<SetStateAction<number>>
}

export const AdvantagesList = (props: AdvantagesListTypes) => (
  <AdvantagesContainer>
    {props.list.map((item, i) => (
      <Advantage key={i} isActive={props.current === i} onClick={() => props.changeIndex(i)}>
        <AdvantageText>{item.title}</AdvantageText>
      </Advantage>
    ))}
  </AdvantagesContainer>
)
