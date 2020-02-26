import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import desktopBackground from "./images/desktop-background.svg"

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
`

const Label = styled.div`
  margin-left: 16px;
  padding: 4px 16px;
  background: #544274;
  border-radius: 16px;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #ffffff;
`

const Description = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-top: 20px;
  max-width: 600px;
`

const StyledContainer = styled(LandingPageContainer)`
  padding: 60px 0;
  position: relative;
  &:after {
    z-index: 0;
    position: absolute;
    content: url("${desktopBackground}");
    left: -100px;
    top: -26px;
    width: 1163.08px;
    height: 328px;
  }
`

export const Footer = () => (
  <StyledFooter>
    <StyledContainer>
      <Header>
        <Title>Вы коуч?</Title>
        <Label>Вам сюда!</Label>
      </Header>
      <Description>
        Приглашаем коучей к сотрудничеству. Предлагаем растущую базу клиентов,
        продвижение по 12+ каналам рекламы и выгодные условия оплаты. Вы станете
        известным, будете работать на удобной платформе и привлечете до 200%
        новых учеников.
      </Description>
    </StyledContainer>
  </StyledFooter>
)
