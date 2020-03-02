import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import desktopBackground from "./images/desktop-background.svg"
import { Button } from "@/application/components/button/normal/Button"

const StyledFooter = styled.div`
  background: #ddd9e3;
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #424242;

  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
  }
`

const Description = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-top: 20px;
  max-width: 600px;
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  padding: 60px 0;
  position: relative;
  z-index: 1;
  &:before {
    z-index: -1;
    position: absolute;
    content: '';
    background-image: url("${desktopBackground}");
    left: -70px;
    top: -20px;
    width: 1163.08px;
    height: 328px;
  }
  
  @media screen and (max-width: 768px) {
    margin-left: 60px;
    &:before {
      left: -77px;
    }
  }
  @media screen and (max-width: 480px) {
    margin: 0 12px;
    padding-top: 34px;
    padding-bottom: 22px;
    &:before {
      left: -20px;
      margin-top: -20px;
      height: 100%;
    }
  }
`

const RegistrationButton = styled(Button)`
  background: #544274;
  color: #ffffff;

  margin-left: 16px;
  padding: 4px 16px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;

  &:active {
    box-shadow: none;
    background: #4f3e74;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 22px;
  }
`

export const Footer = () => (
  <StyledFooter>
    <StyledContainer>
      <Header>
        <Title>Вы коуч?</Title>
        <RegistrationButton>Вам сюда!</RegistrationButton>
      </Header>
      <Description>
        <p>
          Приглашаем коучей к сотрудничеству. Предлагаем растущую базу клиентов, продвижение по 12+ каналам рекламы и
          выгодные условия оплаты.
        </p>
        <p>Вы станете известным, будете работать на удобной платформе и привлечете до 200% новых учеников.</p>
      </Description>
    </StyledContainer>
  </StyledFooter>
)
