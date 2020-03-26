import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
  }
`

const SubTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin-top: 12px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`

const Description = styled.div`
  margin-top: 24px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-bottom: 64px;
  @media screen and (max-width: 768px) {
    margin-bottom: 24px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  max-width: 800px;
`

export const AllNeedsCoach = () => (
  <StyledContainer>
    <Title>62% людей в мире коуч необходим</Title>
    <SubTitle>Если вы здесь — вы в их числе</SubTitle>
    <Description>
      Коучинг вдохновляет людей на позитивные изменения и раскрывает внутренние
      ресурсы. Наставничество помогает решить проблемы, мучившие с детства или
      возникшие совсем недавно.
    </Description>
  </StyledContainer>
)
