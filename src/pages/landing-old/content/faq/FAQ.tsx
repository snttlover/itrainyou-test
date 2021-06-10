import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing-old/common/LandingPageContainer"
import { ExpansionPanel } from "@/oldcomponents/expansion-panel/ExpansionPanel"
import peopleImage from "./images/people.svg"
import questions from "./questions"
import { Button } from "@/oldcomponents/button/normal/Button"

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
    font-size: 20px;
    line-height: 26px;
  }
  @media screen and (max-width: 565px) {
    font-size: 14px;
    line-height: 18px;
    margin-left: 0;
  }
`

const Content = styled.div`
  margin-top: 44px;
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 32px auto 0;
    max-width: 640px;
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
    padding: 0 7px 68px;
  }
  @media screen and (max-width: 565px) {
    padding-bottom: 18px;
    padding-top: 31px;
    margin-top: -31px;
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
      </Content>
    </StyledContainer>
  </BackgroundColor>
)
