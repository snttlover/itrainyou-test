import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing-old/common/LandingPageContainer"

const Title = styled.h3`
  max-width: 432px;
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
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
  }
`

const SubTitle = styled.div`
  margin-top: 12px;
  max-width: 699px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #4858cc;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 585px) {
    display: none;
  }
`

export const AllNeedsCoach = () => (
  <StyledContainer>
    <Title>62% людей в мире коуч необходим Если вы здесь — вы в их числе</Title>
    <SubTitle>
      Коучинг вдохновляет людей на позитивные изменения и раскрывает внутренние ресурсы. Наставничество помогает решить
      проблемы, мучившие с детства
      <br />
      или возникшие совсем недавно.
    </SubTitle>
  </StyledContainer>
)
