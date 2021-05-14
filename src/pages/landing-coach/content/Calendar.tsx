import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

import mainImg from "../assets/calendar/main.png"
import mainImgMobile from "../assets/calendar/main-mobile.png"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 156px;
  }
  @media (min-width: 1140px) {
    margin-bottom: 120px;
  }
`

const StyledContainer = styled(Container)`
  color: #4858cc;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 1140px) {
    align-items: flex-end;
  }
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #4858cc;
  width: 100%;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 44px;
    width: 465px;
  }
`

const Descr = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5b6670;
  width: 100%;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    width: 465px;
    padding-right: 210px;
  }
`

const MainImage = styled.img`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 134px;
    right: 18px;
    width: 310px;
  }

  @media (min-width: 1140px) {
    right: auto;
    top: -60px;
    left: 70px;
    width: 530px;
  }
`

const MainImageMobile = styled.img`
  display: block;
  width: 288px;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: none;
  }
`

export const Calendar = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Календарь синхронизируется с вашими планами в Google</Title>
      <Descr>
        Подключить свой календарь? Легко! Теперь все запланированные события можно увидеть в одном месте - личном
        кабинете на платформе iTrainYou
      </Descr>
      <MainImage src={mainImg} />
      <MainImageMobile src={mainImgMobile} />
    </StyledContainer>
  </Wrapper>
)
