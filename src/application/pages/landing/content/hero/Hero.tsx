import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { Button } from "@/application/components/button/normal/Button"

const GradientContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  color: #424242;
  position: relative;

  background: linear-gradient(
      199.33deg,
      #a3cff3 14.5%,
      rgba(255, 255, 255, 0) 85.5%
    ),
    #9f8dc1;
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
`
const Description = styled.p`
  font-size: 20px;
  line-height: 26px;
  margin-top: 20px;
`

const StyledLandingPageContainer = styled(LandingPageContainer)`
  margin: 95px 0;
  display: flex;
  max-width: 892px;
  flex-direction: column;
`

const RegistrationButton = styled(Button)`
  padding: 4px 16px;
  margin-top: 24px;
  align-self: flex-end;
  
  color: #544274;  
  background: #fff;
  &:active {
    box-shadow: none;
    background: #f6f6f6;
  }
`

export const Hero = () => (
  <GradientContainer>
    <StyledLandingPageContainer>
      <Title>
        Площадка по работе с проверенными коучами из любой точки мира
      </Title>
      <Description>
        Подберите специалиста на сайте, чтобы грамотно поставить и
        гарантированно достичь своей цели
      </Description>
      <RegistrationButton>Зарегистрироваться</RegistrationButton>
    </StyledLandingPageContainer>
  </GradientContainer>
)
