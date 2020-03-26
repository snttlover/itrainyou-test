import * as React from "react"
import styled from "styled-components"
import gradientImage from "./images/gradient.svg"
import mobileGradientImage from "./images/mobile-gradient.svg"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { StepCard } from "./StepCard"
import steps from "./steps-list"

const StyledSteps = styled.div`
  position: relative;
  padding-top: 55px;
  padding-bottom: 90px;
  @media screen and (max-width: 768px) {
    padding-top: 0;
    padding-bottom: 38px;
  }
`

const Gradient = styled.img.attrs({ src: gradientImage })`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  min-width: 1140px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 743px) {
    top: calc(50% + 20px);
  }
  @media screen and (max-width: 768px) {
    height: 225px;
  }
  @media screen and (max-width: 565px) {
    display: none;
  }
`

const MobileGradient = styled(Gradient).attrs({ src: mobileGradientImage })`
  @media screen and (max-width: 565px) {
    display: block;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 743px) {
    top: 50%;
  }
  @media screen and (min-width: 566px) {
    display: none;
  }
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  margin-bottom: 60px;
  @media screen and (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 565px) {
    font-size: 20px;
    line-height: 26px;
  }
`

const StepsList = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 565px) {
    flex-direction: column;
  }
`

export const Steps = () => (
  <StyledSteps>
    <MobileGradient />
    <Gradient />
    <LandingPageContainer>
      <Title> В 10 раз проще, чем подобрать специалиста офлайн</Title>
      <StepsList>
        {steps.map(step => (
          <StepCard key={step.index} {...step} />
        ))}
      </StepsList>
    </LandingPageContainer>
  </StyledSteps>
)
