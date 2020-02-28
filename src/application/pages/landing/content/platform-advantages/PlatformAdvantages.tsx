import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import sliderImagePlaceholder from "./images/1.svg"

import mobileActiveButton from "./images/mobile-advantage-slider-button-active.svg"
import mobileButton from "./images/mobile-advantage-slider-button.svg"

const SlidesContainer = styled.div`
  flex: 1;
  position: relative;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`

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

type AdvantageTypes = {
  isActive?: boolean
}

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #424242;
  text-align: center;
  margin-bottom: 32px;
  @media screen and (max-width: 768px) {
    font-size: 28px;
    line-height: 44px;
  }
`

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
      background: url("${props =>
        props.isActive ? mobileActiveButton : mobileButton}");
    }
  }
`

const SliderContainer = styled.div`
  display: flex;
  height: 400px;
  align-items: center;
  justify-content: center;
  margin-bottom: 120px;
  position: relative;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    height: unset;
    width: 100%;
    margin: 0 24px;
  }

  @media screen and (max-width: 638px) {
    margin: 0;
  }
`

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1000px) {
    align-items: flex-start;
  }
  @media screen and (max-width: 638px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

const DescriptionContainer = styled.div`
  width: 284px;
  margin-right: 26px;
  @media screen and (max-width: 1000px) {
    width: 220px;
  }
  @media screen and (max-width: 638px) {
    order: 2;
    margin-right: 0;
  }
`

const DescriptionTitle = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 26px;
  color: #544274;
  margin-bottom: 24px;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 638px) {
    margin-top: 24px;
    text-align: center;
  }
`

const DescriptionSubTitle = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
    line-height: 22px;
  }
  @media screen and (max-width: 638px) {
    text-align: center;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const Image = styled.img`
  width: 424.86px;
  height: 407.03px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
  @media screen and (max-width: 638px) {
    order: 1;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  @media screen and (max-width: 1000px) {
    margin-bottom: 121px;
  }
  @media screen and (max-width: 638px) {
    margin-bottom: 53px;
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

export const PlatformAdvantages = () => (
  <StyledContainer>
    <Title>Сориентированы на комплекс ваших преимуществ</Title>
    <SliderContainer>
      <SlidesContainer>
        <Slide>
          <DescriptionContainer>
            <DescriptionTitle>Удобный поиск</DescriptionTitle>
            <DescriptionSubTitle>
              Выбирайте коучей по направлению, цене и времени за несколько
              кликов.
            </DescriptionSubTitle>
          </DescriptionContainer>
          <Image src={sliderImagePlaceholder} />
        </Slide>
      </SlidesContainer>
      <AdvantagesContainer>
        <Advantage isActive={true}>
          <AdvantageText> Удобный поиск</AdvantageText>
        </Advantage>
        <Advantage>
          <AdvantageText>Взаимодействие с коучем</AdvantageText>
        </Advantage>
        <Advantage>
          <AdvantageText>Сессия здесь и сейчас</AdvantageText>
        </Advantage>
        <Advantage>
          <AdvantageText>Сам вебинар</AdvantageText>
        </Advantage>
        <Advantage>
          <AdvantageText>Мобильное приложение</AdvantageText>
        </Advantage>
      </AdvantagesContainer>
    </SliderContainer>
  </StyledContainer>
)
