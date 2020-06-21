import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"
import desktopBackground from "./images/desktop-background.svg"
import mobileBackground from "./images/mobile-background.svg"

const StyledFooter = styled.div`
  background: #ddd9e3;
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;

  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
    flex: 1;
  }
`

const Description = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-top: 20px;
  max-width: 600px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 18px;
  }
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
      background-image: url("${mobileBackground}");
      background-repeat: no-repeat;
      left: -30px;
      top: 3px;
      height: 100%;
    }
  }
`

const RegistrationButton = styled(Link)`
  background: #544274;
  color: #ffffff;
  cursor: pointer;

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
        <RegistrationButton to='/auth/signup/1'>Вам сюда!</RegistrationButton>
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
