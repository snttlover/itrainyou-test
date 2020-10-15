import { Icon } from "@/components/icon/Icon"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"
import platform from "./images/platform.svg"

const texts = [
  "Успешным предпринимателям, стремящимся перейти на новый уровень развития",
  "Менеджерам, которые хотят достичь большего",
  "Людям, которые понимают, что что-то мешает двигаться вперед",
  "Спортсменам, работающим на результат",
  "Желающим повысить уверенность в себе",
  "Стремящимся научиться совмещать работу и личную жизнь",
  "Уставшим от рутины и однообразия",
  "Ищущим вторую половину или строящим отношения",
]

export const CoachAdvantages = () => {
  const [textIndex, setIndex] = useState(0)

  const moveIndex = (count: number) => () => {
    setIndex((textIndex + count) % texts.length)
  }

  return (
    <LandingPageContainer>
      <SliderContainer>
        <LeftArrow onClick={moveIndex(-1)} />
        <Text>{texts[textIndex]}</Text>
        <RightArrow onClick={moveIndex(1)} />
      </SliderContainer>
      <MobileSliderContainer>
        <MobileSlider>
          <LeftArrow onClick={moveIndex(-1)} />
          <Text>{texts[textIndex]}</Text>
          <RightArrow onClick={moveIndex(1)} />
        </MobileSlider>
      </MobileSliderContainer>
    </LandingPageContainer>
  )
}

const MobileSliderContainer = styled.div`
  @media screen and (min-width: 565px) {
    display: none;
  }
`

const MobileSlider = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SliderContainer = styled.div`
  position: relative;
  margin: 0 auto;
  background-image: url(${platform});
  width: 904px;
  height: 423px;

  @media screen and (max-width: 768px) {
    background-size: cover;
    width: 696px;
    height: 321px;
  }

  @media screen and (max-width: 565px) {
    display: none;
  }
`

const LeftArrow = styled(Icon).attrs({ name: "left-icon" })`
  position: absolute;
  left: 72px;
  top: 222px;

  fill: #fff;
  width: 17px;
  height: 28px;

  cursor: pointer;
  user-select: none;

  @media screen and (max-width: 768px) {
    width: 11px;
    height: 19px;
    left: 42px;
    top: 170px;
  }

  @media screen and (max-width: 565px) {
    position: unset;
    fill: #4858cc;
    margin-right: 4px;
  }
`
const RightArrow = styled(Icon).attrs({ name: "right-icon" })`
  position: absolute;
  left: 503px;
  top: 222px;

  fill: #fff;
  width: 17px;
  height: 28px;

  cursor: pointer;
  user-select: none;

  @media screen and (max-width: 768px) {
    width: 11px;
    height: 19px;
    left: 350px;
    top: 170px;
  }

  @media screen and (max-width: 565px) {
    position: unset;
    fill: #4858cc;
    margin-left: 4px;
  }
`

const Text = styled.div`
  position: absolute;
  left: 151px;
  top: 184px;
  width: 290px;

  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 26px;
  color: #d3d7f3;

  @media screen and (max-width: 768px) {
    width: 260px;
    left: 77px;
    top: 128px;
  }

  @media screen and (max-width: 565px) {
    position: unset;
    text-align: center;

    font-size: 16px;
    line-height: 26px;
    color: #4858cc;
  }
`
