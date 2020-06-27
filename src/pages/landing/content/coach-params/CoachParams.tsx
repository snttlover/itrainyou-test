import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "../../common/LandingPageContainer"
import { CoachParamsCard } from "./CoachParamsCard"
import cards from "./cards"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
  }
`
const SubTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  padding-top: 60px;
  padding-bottom: 60px;
  @media screen and (max-width: 768px) {
    padding-bottom: 63px;
    padding-top: 26px;
  }
`

const CoachParamsCardsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    width: auto;
    max-width: 600px;
    margin: 0 auto;
  }
  @media screen and (max-width: 554px) {
    flex-direction: column;
    align-items: center;
  }
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
  @media screen and (max-width: 768px) {
    width: auto;
    max-width: 240px;
    justify-content: flex-start !important;
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
