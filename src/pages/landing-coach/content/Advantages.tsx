import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

import adv1Img from "../assets/advantages/1.svg"
import adv2Img from "../assets/advantages/2.svg"
import adv3Img from "../assets/advantages/3.svg"
import adv4Img from "../assets/advantages/4.svg"

const Wrapper = styled.section`
  background: white;
  margin-bottom: 56px;
`

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4858cc;
`

const AdvantagesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
`

const Advantage = styled.li`
  margin: 0;
  padding: 0;
  width: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    display: block;
    margin-bottom: 8px;
    height: 60px;
  }

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    align-items: center;
    text-align: center;
    color: #4858cc;
    margin-bottom: 8px;
    min-height: 40px;
    width: 180px;
  }

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #5b6670;
    width: 230px;
  }
`

export const Advantages = () => (
  <Wrapper>
    <StyledContainer>
      <AdvantagesList>
        <Advantage>
          <img src={adv1Img} />
          <h3>Новые клиенты</h3>
          <p>Клиенты находят меня сами. Мне не нужно платить за рекламу в интернете</p>
        </Advantage>
        <Advantage>
          <img src={adv2Img} />
          <h3>Профессиональное сообщество</h3>
          <p>Я работаю в компании единомышленников</p>
        </Advantage>
        <Advantage>
          <img src={adv3Img} />
          <h3>Онлайн-органайзер коучинговой практики</h3>
          <p>Все материалы о клиенте и прошедшим сессиям в личном кабинете</p>
        </Advantage>
        <Advantage>
          <img src={adv4Img} />
          <h3>Поддержка на любом этапе работы</h3>
          <p>Постоянная техподдержка и модерация</p>
        </Advantage>
      </AdvantagesList>
    </StyledContainer>
  </Wrapper>
)
