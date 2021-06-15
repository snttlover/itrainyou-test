import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "../../common/LandingPageContainer"
import { CoachParamsCard } from "./CoachParamsCard"
import cards from "./cards"

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
const SubTitle = styled.h3`
  font-family: Roboto;
  max-width: 650px;
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

const StyledContainer = styled(LandingPageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;

  @media screen and (max-width: 768px) {
    padding: 26px 36px 63px;
  }
  @media screen and (max-width: 565px) {
    padding: 26px 10px 63px;
    font-size: 16px;
    line-height: 26px;
  }
`

const CoachParamsCardsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 554px) {
    flex-direction: column;
    align-items: center;
  }
`

const CoachParamsCardWrapper = styled.div`
  width: 33.3%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 50%;
  }
  @media screen and (max-width: 565px) {
    width: 100%;
  }
`

export const CoachParams = () => (
  <StyledContainer>
    <Title>Измените направление своей жизни за 2 мин.</Title>
    <SubTitle>
      Выберите наставника из базы проверенных коучей и получите четкое руководство по постановке и достижению цели
    </SubTitle>
    <CoachParamsCardsList>
      {cards.map((card, i) => (
        <CoachParamsCardWrapper key={i}>
          <CoachParamsCard {...card} />
        </CoachParamsCardWrapper>
      ))}
    </CoachParamsCardsList>
  </StyledContainer>
)
