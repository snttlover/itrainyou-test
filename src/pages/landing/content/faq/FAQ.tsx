import { routeNames } from "@/pages/routes"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"
import { ExpansionPanel } from "@/components/expansion-panel/ExpansionPanel"
import peopleImage from "./images/people.svg"
import questions from "./questions"
import { Button } from "@/components/button/normal/Button"

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  margin-bottom: 12px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 28px;
    margin-left: 20px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
    margin-left: 0;
  }
`

const SubTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 36px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 24px;
    margin-left: 20px;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 22px;
    margin-left: 0;
  }
`

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const QuestionsList = styled.div`
  flex: 1;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const PeopleImage = styled.img.attrs({ src: peopleImage })`
  width: 360px;
  margin-left: 40px;
  margin-top: 140px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const StyledExpansionPanel = styled(ExpansionPanel)`
  margin-bottom: 24px;
  @media screen and (max-width: 480px) {
    margin-bottom: 12px;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  padding-bottom: 40px;
  @media screen and (max-width: 768px) {
    padding: 0 7px;
    padding-bottom: 68px;
  }
  @media screen and (max-width: 480px) {
    padding-bottom: 18px;
  }
`

const StyledRegistrationButton = styled(Button)`
  padding: 4px 16px;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    align-self: center;
  }
  @media screen and (max-width: 480px) {
    margin-top: 10px;
  }
`

export const FAQ = () => (
  <StyledContainer>
    <Title>У вас уже возникло много вопросов</Title>
    <SubTitle>Даем ответы на 7 самых популярных</SubTitle>
    <Content>
      <QuestionsList>
        {questions.map((faq, i) => (
          <StyledExpansionPanel key={i} title={faq.question}>
            {faq.answer}
          </StyledExpansionPanel>
        ))}
      </QuestionsList>
      <PeopleImage />
      <Link to={routeNames.signup("1")}>
        <StyledRegistrationButton>Зарегистрироваться</StyledRegistrationButton>
      </Link>
    </Content>
  </StyledContainer>
)
