import React from "react"
import styled from "styled-components"

import { routeNames } from "@/pages/route-names"

import { Container } from "../common/Container"
import { RegisterButton } from "../common/RegisterButton"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 82px;
`

const StyledContainer = styled(Container)`
  position: relative;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #4858cc;
  margin-bottom: 46px;
`

const StyledRegisterButton = styled(RegisterButton)`
  position: absolute;
  top: 0;
  right: 0;

  font-size: 16px;
  line-height: 24px;
  padding: 12px 24px;
`

const SectionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Section = styled.div`
  width: 534px;
`

const SectionTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #4858cc;
  margin-bottom: 16px;
  min-height: 52px;
  max-width: 360px;
`

const List = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 16px;
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
  padding-left: 16px;
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
`

type State = {
  showExtraSchools: boolean
}

export class BecomeCoach extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { showExtraSchools: false }
  }

  render() {
    return (
      <Wrapper>
        <StyledContainer>
          <Title>Хотите стать коучем iTrainYou?</Title>
          <StyledRegisterButton to={routeNames.signup("1")}>Зарегистрироваться</StyledRegisterButton>
          <SectionsWrapper>
            <Section>
              <SectionTitle>Вы сертифицированы одной из ведущих школ коучинга:</SectionTitle>
              <List>
                <ListItem>Международная Федерация Коучинга (ICF)</ListItem>
                <ListItem>Международный Эриксоновский Университет Коучинга</ListItem>
                <ListItem>INTERNATIONAL COACHING ACADEMY</ListItem>
                <ListItem>Nova Terra Coach Training & Corporate Development</ListItem>
                <ListItem>Международный Университет GLOBAL COACHING</ListItem>
                <ListItem>Международный центр профессионального коучинга ICP Centre</ListItem>
                <ListItem>CareerWay</ListItem>
                {this.state.showExtraSchools ? (
                  <>
                    <ListItem>Hidden School 1</ListItem>
                    <ListItem>Hidden School 2</ListItem>
                  </>
                ) : (
                  ""
                )}
              </List>
              <ShowMore
                onClick={() => {
                  this.setState(prevState => {
                    return {
                      showExtraSchools: !prevState.showExtraSchools,
                    }
                  })
                }}
              >
                {this.state.showExtraSchools ? "Уменьшить список школ" : "Список всех школ"}
              </ShowMore>
            </Section>
            <Section>
              <SectionTitle>Вы разделяете наши ценности:</SectionTitle>
              <List>
                <ListItem>Постоянное стремление к развитию</ListItem>
                <ListItem>Максимальная концентрация на клиенте</ListItem>
                <ListItem>Ориентация на решения в будущем</ListItem>
                <ListItem>Системный подход в работе с клиентом</ListItem>
                <ListItem>Осознанность себя, своей жизни, отношений, своих целей</ListItem>
                <ListItem>Ценности клиента важны ровно как и действия клиента</ListItem>
                <ListItem>Партнерство в работе с клиентом</ListItem>
              </List>
            </Section>
          </SectionsWrapper>
        </StyledContainer>
      </Wrapper>
    )
  }
}
