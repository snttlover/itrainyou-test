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
    </LandingPageContainer>
  )
}

const SliderContainer = styled.div`
  position: relative;
  margin: 0 auto;
  background-image: url(${platform});
  width: 904px;
  height: 423px;
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
`
