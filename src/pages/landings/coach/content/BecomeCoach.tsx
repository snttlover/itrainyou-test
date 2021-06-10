import React, { useState } from "react"
import styled from "styled-components"

import { routeNames } from "@/pages/route-names"

import { schools, extraSchools, values } from "./become-coach/content"

import { Container } from "../../common/Container"
import { RegisterButton } from "../../common/RegisterButton"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 80px;
  }

  @media (min-width: 1140px) {
    margin-bottom: 60px;
  }
`

const StyledContainer = styled(Container)`
  position: relative;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #4858cc;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 44px;
    margin-bottom: 24px;
  }

  @media (min-width: 1140px) {
    margin-bottom: 46px;
  }
`

const StyledRegisterButton = styled(RegisterButton)`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 24px;
  margin-bottom: 24px;
  width: 205px;

  @media (min-width: 768px) {
    margin-bottom: 52px;
  }

  @media (min-width: 1140px) {
    position: absolute;
    top: 0;
    right: 0;

    margin-bottom: 0;
  }
`

const SectionsWrapper = styled.div`
  width: 100%;

  @media (min-width: 1140px) {
    display: flex;
    justify-content: space-between;
  }
`

const Section = styled.div`
  width: 100%;

  &:first-child {
    margin-bottom: 24px;
  }

  @media (min-width: 768px) {
    &:first-child {
      margin-bottom: 44px;
    }
  }

  @media (min-width: 1140px) {
    width: 534px;

    &:first-child {
      margin-bottom: 0;
    }
  }
`

const SectionTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #4858cc;
  margin-bottom: 16px;

  max-width: 360px;

  @media (min-width: 1140px) {
    min-height: 52px;
    display: flex;
    align-items: center;
  }
`

const List = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`

const ListItem = styled.li`
  margin: 0;
  padding: 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5b6670;
  padding-left: 22px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: #4858cc;
    border-radius: 50%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`

const ShowMore = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  text-decoration-line: underline;
  color: #5b6670;
  border: none;
  background: white;
  cursor: pointer;
  margin-top: 16px;
`

export const BecomeCoach = () => {
  const [showExtraSchools, setShowExtraSchools] = useState(false)

  return (
    <Wrapper>
      <StyledContainer>
        <Title>Хотите стать коучем iTrainYou?</Title>
        <StyledRegisterButton to={routeNames.signup("1")}>Зарегистрироваться</StyledRegisterButton>
        <SectionsWrapper>
          <Section>
            <SectionTitle>Вы сертифицированы одной из ведущих школ коучинга:</SectionTitle>
            <List>
              {schools.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
              {showExtraSchools ? (
                <>
                  {extraSchools.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                  ))}
                </>
              ) : (
                ""
              )}
            </List>
            <ShowMore onClick={() => setShowExtraSchools(!showExtraSchools)}>
              {showExtraSchools ? "Уменьшить список школ" : "Список всех школ"}
            </ShowMore>
          </Section>
          <Section>
            <SectionTitle>Вы разделяете наши ценности:</SectionTitle>
            <List>
              {values.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </Section>
        </SectionsWrapper>
      </StyledContainer>
    </Wrapper>
  )
}
