import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import sliderImagePlaceholder from "./images/1.svg"

const SlidesContainer = styled.div`
  flex: 1;
  position: relative;
`

const AdvantagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
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
`

const Advantage = styled.div<AdvantageTypes>`
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 26px;
  color: ${props => (props.isActive ? `#544274` : `#3B8AC3`)};
  text-decoration: ${props => (props.isActive ? `underline` : `none`)};
`

const SliderContainer = styled.div`
  display: flex;
  height: 400px;
  align-items: center;
  justify-content: center;
  margin-bottom: 120px;
`

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const DescriptionContainer = styled.div`
  width: 284px;
  margin-right: 26px;
`

const DescriptionTitle = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 26px;
  color: #544274;
  margin-bottom: 24px;
`

const DescriptionSubTitle = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
`

const Image = styled.img`
  width: 424.86px;
  height: 407.03px;
`

export const PlatformAdvantages = () => (
  <LandingPageContainer>
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
        <Advantage isActive={true}>Удобный поиск</Advantage>
        <Advantage>Взаимодействие с коучем</Advantage>
        <Advantage>Сессия здесь и сейчас</Advantage>
        <Advantage>Сам вебинар</Advantage>
        <Advantage>Мобильное приложение</Advantage>
      </AdvantagesContainer>
    </SliderContainer>
  </LandingPageContainer>
)
