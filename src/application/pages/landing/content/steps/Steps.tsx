import * as React from "react"
import styled from "styled-components"
import gradientImage from "./images/gradient.svg"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { StepCard } from "./StepCard"
import steps from "./steps-list"

const StyledSteps = styled.div`
  width: 100%;
  background-image: url("${gradientImage}");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 55px;
  padding-bottom: 90px;
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #424242;
  margin-bottom: 60px;
`

const StepsList = styled.div`
  display: flex;
  justify-content: center;
`

export const Steps = () => (
  <StyledSteps>
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
