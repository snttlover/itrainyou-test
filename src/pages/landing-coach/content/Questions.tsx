import React from "react"
import styled from "styled-components"

import { content } from "./questions/content"

import { Container } from "../common/Container"

import arrowIcon from "../assets/questions/arrow-down.svg"

const Wrapper = styled.section`
  background: #f4f5f7;
  margin-bottom: 0;
`

const StyledContainer = styled(Container)`
  padding: 52px 0 38px;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #4858cc;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 40px;
`

const List = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style: none;
  width: 720px;
`

const ListItem = styled.li`
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #424242;
  }

  p {
    margin-top: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #424242;
    width: 640px;
  }
`

const Arrow = styled.i`
  display: block;
  position: absolute;
  top: 24px;
  right: 21px;
  width: 14px;
  height: 8px;
  background: url("${arrowIcon}");
  transform: rotate(${props => (props.reverse ? "0deg" : "180deg")});
`

type Props = any

type State = {
  openedQuestions: array
}

export class Questions extends React.Component<Props, State> {
  state: State = {
    openedQuestions: [0, 1],
  }

  toggleQuestion(index: number) {
    this.setState(prevState => {
      let newQuestions = [...prevState.openedQuestions]

      if (prevState.openedQuestions.indexOf(index) === -1) {
        newQuestions.push(index)
      } else {
        newQuestions = newQuestions.filter(item => item !== index)
      }

      return {
        openedQuestions: [...newQuestions],
      }
    })
  }

  render() {
    return (
      <Wrapper>
        <StyledContainer>
          <Title>Есть вопросы? Возможно эти:</Title>
          <List>
            {content.map((item, index) => (
              <ListItem
                onClick={() => {
                  this.toggleQuestion(index)
                }}
              >
                <h3>{item.question}</h3>
                {this.state.openedQuestions.includes(index) ? <p>{item.answer}</p> : ""}
                <Arrow reverse={!this.state.openedQuestions.includes(index)} />
              </ListItem>
            ))}
          </List>
        </StyledContainer>
      </Wrapper>
    )
  }
}
