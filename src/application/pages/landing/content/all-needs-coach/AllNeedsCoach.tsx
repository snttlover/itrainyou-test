import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"

const Title = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #424242;
  text-align: center;
`

const SubTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-top: 12px;
  text-align: center;
`

const Description = styled.div`
  margin-top: 24px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #424242;
  margin-bottom: 64px;
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
