import React from "react"
import styled from "styled-components"

import { Link } from "react-router-dom"
import { routeNames } from "@/pages/route-names"

import { Container } from "../../common/Container"

// @ts-ignore
import mainImg from "../assets/first-free/main.jpg"

const Wrapper = styled.section`
  background: #f4f5f7;

  @media (min-width: 1140px) {
    position: relative;
    height: 600px;
  }
`

const StyledContainer = styled(Container)`
  padding-bottom: 24px;

  @media (min-width: 768px) {
    padding-bottom: 56px;
  }

  @media (min-width: 1140px) {
    padding-top: 40px;
    padding-bottom: 0px;
  }
`

const MainImage = styled.div`
background-image: url('${mainImg}');
background-size: cover;
background-position: center center;
width: 100%;
height: 180px;
margin-bottom: 16px;

@media (min-width: 558px) {
    height: 32vw;
}

@media (min-width: 768px) {
    height: 400px;
    margin-bottom: 40px;
}

@media (min-width: 1140px) {
    position: absolute;
    height: 600px;
    width: 49vw;
    top: 0;
    right: 0;
    margin-bottom: 0px;
}
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #424242;
  margin-bottom: 24px;
  width: 288px;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 32px;
    width: auto;
  }
`

const SubTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #424242;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 28px;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 288px;

  &:not(:last-of-type) {
    margin-bottom: 32px;
  }

  @media (min-width: 768px) {
    width: 396px;
  }
`

const ListItem = styled.li`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  padding-left: 24px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &::before {
    position: absolute;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: #4858cc;
  }
`

const Button = styled(Link)`
  display: inline-block;

  background: #4858cc;
  border-radius: 24px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  padding: 12px 24px;
  margin-top: 24px;

  @media (min-width: 768px) {
    margin-top: 40px;
  }

  @media (min-width: 1140px) {
    margin-top: 78px;
  }

  @media (min-width: 1600px) {
    margin-top: 40px;
  }
`

export const FirstFree = () => (
  <Wrapper>
    <MainImage />
    <StyledContainer>
      <Title>Первая сессия — бесплатно</Title>
      <SubTitle>Зачем?</SubTitle>
      <List>
        <ListItem>Познакомиться с коучем</ListItem>
        <ListItem>Задать вопросы</ListItem>
        <ListItem>Понять, над чем необходимо работать</ListItem>
      </List>
      <SubTitle>Как получить?</SubTitle>
      <List>
        <ListItem>Пройти регистрацию</ListItem>
        <ListItem>Заполнить короткую анкету и получить подборку коучей</ListItem>
        <ListItem>Выбрать удобное время и забронировать сессию</ListItem>
      </List>
      <Button to={{ pathname: routeNames.search() }}>Выбрать коуча</Button>
    </StyledContainer>
  </Wrapper>
)
