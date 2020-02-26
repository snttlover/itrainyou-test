import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { ExpansionPanel } from "@/application/components/expansion-panel/ExpansionPanel"
import peopleImage from "./images/people.svg"
import questions from "./questions"

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #424242;
  margin-bottom: 12px;
`

const SubTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 36px;
`

const Content = styled.div`
  display: flex;
  align-items: flex-start;
`

const QuestionsList = styled.div`
  flex: 1;
`

const PeopleImage = styled.img.attrs({ src: peopleImage })`
  width: 360px;
  margin-left: 40px;
  margin-top: 140px;
`

const StyledExpansionPanel = styled(ExpansionPanel)`
  margin-bottom: 24px;
`

const StyledContainer = styled(LandingPageContainer)`
  padding-bottom: 40px;
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
    </Content>
  </StyledContainer>
)
