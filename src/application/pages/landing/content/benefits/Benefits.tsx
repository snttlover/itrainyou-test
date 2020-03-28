import Link from "next/link"
import * as React from "react"
import styled from "styled-components"
import { BenefitCard } from "./BenefitCard"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { Button } from "@/application/components/button/normal/Button"
import cards from "./cards"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  margin-bottom: 52px;
  @media screen and (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
  }
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledContainer = styled(LandingPageContainer)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    margin-top: 64px;
    margin-bottom: 52px;
  }
`

const StyledRegistrationButton = styled(Button)`
  padding: 4px 16px;
`

export const Benefits = () => (
  <StyledContainer>
    <Title>Обращение к коучу дает массу преимуществ каждому человеку</Title>
    <CardsContainer>
      {cards.map((card, i) => (
        <BenefitCard key={i} {...card} />
      ))}
    </CardsContainer>

    <Link href='/signup/1'>
      <StyledRegistrationButton>Зарегистрироваться</StyledRegistrationButton>
    </Link>
  </StyledContainer>
)
