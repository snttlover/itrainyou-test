import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "../../common/LandingPageContainer"
import { StepCard } from "./StepCard"
import steps from "./steps-list"
import stepsBg from "../../assets/steps-bg.svg"

const StyledSteps = styled.div`
  position: relative;
  padding-top: 155px;
  padding-bottom: 100px;
`

const BgImage = styled.div`
  background-image: url(${stepsBg});
  background-repeat: repeat-x;
  background-size: contain;
  background-position: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    background-size: cover;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 0 36px;
  }

  @media screen and (max-width: 565px) {
    padding: 0;
  }
`

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #424242;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 26px;
  }
  @media screen and (max-width: 565px) {
    font-size: 16px;
    line-height: 26px;
  }
`

const Description = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #4858cc;

  margin-top: 12px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 26px;
  }
  @media screen and (max-width: 565px) {
    font-size: 14px;
    line-height: 18px;
  }
`

const StepsList = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    margin-top: 32px;
  }
  @media screen and (max-width: 565px) {
    flex-direction: column;
  }
`

const StepImage = styled.img`
  margin-top: 40px;
  width: 723.16px;
  height: 400.73px;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    width: 440px;
    height: 243.82px;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`

export const Steps = () => {
  const [stepIndex, setStepIndex] = useState(1)
  return (
    <StyledSteps>
      <BgImage />
      <StyledContainer>
        <Title>Персональный коуч помогает получить результат</Title>
        <Description>В 10 раз проще, чем подобрать специалиста офлайн</Description>
        <StepsList>
          {steps.map(step => (
            <StepCard key={step.index} {...step} onClick={setStepIndex} selected={step.index === stepIndex} />
          ))}
        </StepsList>
        <StepImage src={steps[stepIndex - 1].image} />
      </StyledContainer>
    </StyledSteps>
  )
}
