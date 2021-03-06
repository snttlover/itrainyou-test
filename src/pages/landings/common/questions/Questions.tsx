import React, { useState } from "react"
import styled from "styled-components"

import { Container } from "../Container"

import arrowIcon from "./assets/arrow-down.svg"

const Wrapper = styled.section`
  background: #f4f5f7;
  padding: 24px 0;
  margin-bottom: 0;

  @media (min-width: 768px) {
    padding: 52px 0 38px;
  }

  @media (min-width: 1140px) {
    padding: 52px 0 64px;
  }
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #4858cc;
  margin-bottom: 16px;
  width: 288px;

  @media (min-width: 768px) {
    width: 100%;
    font-size: 32px;
    line-height: 44px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 40px;
  }
`

const List = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style: none;
  width: 100%;
  max-width: 720px;
`

const ListItem = styled.li<{ isOpen: boolean }>`
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  padding-right: 64px;
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
    line-height: ${props => (props.isOpen ? "18px" : "22px")};
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
  }
`

const Arrow = styled.i<{ reverse: boolean }>`
  display: block;
  position: absolute;
  top: 24px;
  right: 21px;
  width: 14px;
  height: 8px;
  background: url("${arrowIcon}");
  transform: rotate(${props => (props.reverse ? "0deg" : "180deg")});
`

type Props = {
  questions: any[]
}

export const Questions = ({ questions }: Props) => {
  const [openedQuestions, setOpenedQuestions] = useState([] as any)

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
      <Container>
        <Title>???????? ??????????????? ???????????????? ??????:</Title>
        <List>
          {questions.map((item, index) => (
            <ListItem key={item.id} onClick={() => toggleQuestions(index)} isOpen={openedQuestions.includes(index)}>
              <h3>{item.question}</h3>
              {openedQuestions.includes(index) ? <p>{item.answer}</p> : ""}
              <Arrow reverse={!openedQuestions.includes(index)} />
            </ListItem>
          ))}
        </List>
      </Container>
    </Wrapper>
  )
}
