import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "../../common/LandingPageContainer"
import { Button } from "../../../../components/button/normal/Button"

const GradientContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  position: relative;

  background: linear-gradient(199.33deg, #a3cff3 14.5%, rgba(255, 255, 255, 0) 85.5%), #9f8dc1;
  @media screen and (max-width: 480px) {
    background: linear-gradient(232.7deg, #a3cff3 14.5%, rgba(255, 255, 255, 0) 85.5%), #9f8dc1;
  }
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;

  @media screen and (max-width: 768px) {
    font-size: 28px;
    line-height: 36px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 28px;
  }
`
const Description = styled.p`
  font-size: 20px;
  line-height: 26px;
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
    line-height: 20px;
  }
`

const StyledLandingPageContainer = styled(LandingPageContainer)`
  margin: 95px 0;
  display: flex;
  max-width: 892px;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    margin: 44px 19px 24px 44px;
  }
  @media screen and (max-width: 480px) {
    margin: 64px 12px 40px;
  }
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
  @media screen and (max-width: 480px) {
    align-self: center;
    margin-top: 122px;
  }
`

export const Hero = () => (
  <GradientContainer>
    <StyledLandingPageContainer>
      <Title>Площадка по работе с проверенными коучами из любой точки мира</Title>
      <Description>
        Подберите специалиста на сайте, чтобы грамотно поставить и гарантированно достичь своей цели
      </Description>
      <Link to='/auth/signup/1'>
        <RegistrationButton>Зарегистрироваться</RegistrationButton>
      </Link>
    </StyledLandingPageContainer>
  </GradientContainer>
)
