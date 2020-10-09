import { routeNames } from "@/pages/route-names"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"
import { ExpansionPanel } from "@/components/expansion-panel/ExpansionPanel"
import peopleImage from "./images/people.svg"
import questions from "./questions"
import { Button } from "@/components/button/normal/Button"

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #424242;
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
  margin-top: 12px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #4858cc;
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
  margin-top: 44px;
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
  width: 296px;
  margin-left: 40px;
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
  margin-top: 85px;
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

const BackgroundColor = styled.div`
  background-color: #dbdee0;
`

export const FAQ = () => (
  <BackgroundColor>
    <StyledContainer>
      <Title>Новая сфера требует развернутых ответов</Title>
      <SubTitle>Даем ответы на самые популярные</SubTitle>
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
  </BackgroundColor>
)
