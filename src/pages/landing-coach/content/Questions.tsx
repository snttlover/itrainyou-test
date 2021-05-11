import React, { useState } from "react"
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

export const Questions = () => {
  const [openedQuestions, setOpenedQuestions] = useState([0])

  const toggleQuestions = (index: number) => {
    let newQuestions = [...openedQuestions]

    if (openedQuestions.indexOf(index) === -1) {
      newQuestions.push(index)
    } else {
      newQuestions = newQuestions.filter(item => item !== index)
    }

    return setOpenedQuestions([...newQuestions])
  }

  return (
    <Wrapper>
      <StyledContainer>
        <Title>Есть вопросы? Возможно эти:</Title>
        <List>
          {content.map((item, index) => (
            <ListItem key={item.id} onClick={() => toggleQuestions(index)}>
              <h3>{item.question}</h3>
              {openedQuestions.includes(index) ? <p>{item.answer}</p> : ""}
              <Arrow reverse={!openedQuestions.includes(index)} />
            </ListItem>
          ))}
        </List>
      </StyledContainer>
    </Wrapper>
  )
}
