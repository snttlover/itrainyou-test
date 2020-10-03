import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "#/pages/landing/common/LandingPageContainer"
import { AdvantagesList } from "./content/AdvatagesList"
import advantages from "./advantages"
import { useState } from "react"
import { DesktopSlider } from "./content/DesktopSlider"
import { MobileSlider } from "./content/MobileSlider"

const SlidesContainer = styled.div`
  flex: 1;
  position: relative;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  margin-bottom: 32px;
  @media screen and (max-width: 768px) {
    font-size: 28px;
    line-height: 44px;
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

const StyledContainer = styled(LandingPageContainer)`
  padding-top: 30px;
  @media screen and (max-width: 1000px) {
    margin-bottom: 121px;
  }
  @media screen and (max-width: 638px) {
    margin-bottom: 53px;
  }
`

export const PlatformAdvantages = () => {
  const [currentSlideIndex, changeCurrentSlideIndex] = useState(0)

  const slide = advantages[currentSlideIndex]

  return (
    <StyledContainer>
      <Title>Сориентированы на комплекс ваших преимуществ</Title>
      <SliderContainer>
        <SlidesContainer>
          <DesktopSlider {...slide} />
          <MobileSlider current={currentSlideIndex} items={advantages} slideChanged={changeCurrentSlideIndex} />
        </SlidesContainer>
        <AdvantagesList current={currentSlideIndex} list={advantages} changeIndex={changeCurrentSlideIndex} />
      </SliderContainer>
    </StyledContainer>
  )
}
