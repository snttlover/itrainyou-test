import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"

import mainImg from "../assets/handy-cabinet/cabinet.png"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 0;

  @media (min-width: 768px) {
    margin-bottom: 70px;
  }
  @media (min-width: 1140px) {
    margin-bottom: 160px;
  }
`

const StyledContainer = styled(Container)`
  color: #4858cc;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
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
  margin-bottom: 16px;
  width: 258px;

  @media (min-width: 768px) {
    font-size: 30px;
    line-height: 38px;
    width: 320px;
  }
  @media (min-width: 1140px) {
    width: 465px;
    padding-right: 140px;
  }
`

const Descr = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5b6670;
  width: 235px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    width: 320px;
    padding-right: 65px;
  }

  @media (min-width: 1140px) {
    width: 465px;
    padding-right: 230px;
  }
`

const MainImage = styled.img`
  width: 288px;
  margin: 0 auto;

  @media (min-width: 558px) {
    margin: 0;
    margin-left: auto;
  }

  @media (min-width: 768px) {
    margin: 0;
    position: absolute;
    top: 0px;
    left: -10px;
    width: 371px;
  }

  @media (min-width: 1140px) {
    top: 0px;
    left: 0px;
    width: 523px;
  }
`

export const HandyCabinet = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Вся коммуникация в личном кабинете</Title>
      <Descr>Переписывайтесь, планируйте календарь, получайте материалы от коучей в одном окне.</Descr>
      <MainImage src={mainImg} />
    </StyledContainer>
  </Wrapper>
)
