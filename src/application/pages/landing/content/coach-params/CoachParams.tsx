import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { CoachParamsCard } from "./CoachParamsCard"
import cards from "./cards"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  color: #424242;
  margin-bottom: 24px;
`
const SubTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
`

const StyledContainer = styled(LandingPageContainer)`
  padding-top: 60px;
  padding-bottom: 60px;
`

const CoachParamsCardsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CoachParamsCardWrapper = styled.div`
  width: 33.3%;
  display: flex;
  &:nth-child(2),
  &:nth-child(5) {
    justify-content: center;
  }
  &:nth-child(3),
  &:nth-child(6) {
    justify-content: flex-end;
  }
`

export const CoachParams = () => (
  <StyledContainer>
    <Title>Подберите своего коуча по 8+ параметрам</Title>
    <SubTitle>Измените направление своей жизни за 2 мин.</SubTitle>
    <CoachParamsCardsList>
      {cards.map((card, i) => (
        <CoachParamsCardWrapper key={i}>
          <CoachParamsCard {...card} />
        </CoachParamsCardWrapper>
      ))}
    </CoachParamsCardsList>
  </StyledContainer>
)
