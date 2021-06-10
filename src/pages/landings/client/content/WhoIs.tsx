import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"
import { MobileSlider } from "./who-is/MobileSlider"

import mainImage from "../assets/who-is/woman.svg"
import bg320 from "../assets/who-is/bg-320.svg"
import bg558 from "../assets/who-is/bg-558.svg"
import bg768 from "../assets/who-is/bg-768.svg"
import bg1140 from "../assets/who-is/bg-1140.svg"

const Wrapper = styled.section`
  background: #4858cc;
  position: relative;
  height: 512px;

  @media (min-width: 768px) {
    height: 560px;
  }

  @media (min-width: 1140px) {
    height: 600px;
  }
`

const StyledContainer = styled(Container)`
  position: relative;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 40px;
    left: 70px;
    width: 227px;
    height: 204px;
    background-image: url('${bg320}');
    background-size: 227px 204px;

    @media (min-width: 558px) {
      top: 40px;
      left: 190px;
      width: 300px;
      height: 134px;
      background-image: url('${bg558}');
      background-size: 300px 134px;
    }

    @media (min-width: 768px) {
      top: 65px;
      left: -10px;
      width: 739px;
      height: 442px;
      background-image: url('${bg768}');
      background-size: 739px 442px;
    }

    @media (min-width: 1140px) {
      top: 80px;
      left: 120px;
      width: 895px;
      height: 437px;
      background-image: url('${bg1140}');
      background-size: 895px 437px;
    }
  }
`

const MainImage = styled.img`
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 210px;

  @media (min-width: 768px) {
    top: 216px;
    transform: translateX(-50%) translateX(-7px);
  }

  @media (min-width: 1140px) {
    width: 338px;
    top: 217px;
    transform: translateX(-50%) translateX(27px);
  }
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;
  padding-top: 24px;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    padding-top: 40px;
  }
`

const List = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: block;
    list-style: none;
  }
`

const ListItem = styled.li`
  position: absolute;
  top: 0;
  left: 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  width: 172px;

  &:nth-child(1) {
    left: 85px;
    top: 155px;

    @media (min-width: 1140px) {
      left: 347px;
      top: 133px;
    }
  }

  &:nth-child(2) {
    left: 43px;
    top: 383px;

    @media (min-width: 1140px) {
      left: 165px;
      top: 347px;
    }
  }

  &:nth-child(3) {
    left: 401px;
    top: 97px;

    @media (min-width: 1140px) {
      left: 639px;
      top: 112px;
    }
  }

  &:nth-child(4) {
    left: 533px;
    top: 223px;

    @media (min-width: 1140px) {
      left: 812px;
      top: 231px;
    }
  }

  &:nth-child(5) {
    left: 482px;
    top: 428px;

    @media (min-width: 1140px) {
      left: 807px;
      top: 438px;
    }
  }
`

const MobileSliderWrapper = styled.div`
  display: block;
  position: absolute;
  bottom: 63px;
  left: 0;
  right: 0;

  @media (min-width: 768px) {
    display: none;
  }
`

const items = [
  `Я работаю с вами в <strong>настоящем</strong> моменте, смотря <strong>в будущее</strong>`,
  `Совместно с вами <strong>конкретизирую</strong> шаги для <strong>достижения результата</strong>`,
  `Приумножаю энергию для <strong>реализации цели</strong>`,
  `Помогаю построить картину <strong>конечного результата</strong>`,
  `Открываю ваши <strong>возможности и ресурсы</strong>`,
]

export const WhoIs = () => {
  return (
    <Wrapper>
      <StyledContainer>
        <Title>Кто такой коуч?</Title>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </List>
        <MainImage src={mainImage} />
      </StyledContainer>
      <MobileSliderWrapper>
        <MobileSlider items={items} />
      </MobileSliderWrapper>
    </Wrapper>
  )
}
