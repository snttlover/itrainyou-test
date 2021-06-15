import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"

import mainImg from "../assets/payment/main.png"
import mainImgMobile from "../assets/payment/main-mobile.png"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: 275px;
  }
  @media (min-width: 1140px) {
    margin-bottom: 322px;
  }
`

const StyledContainer = styled(Container)`
  color: #4858cc;
  position: relative;
  display: flex;
  flex-direction: column;
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
    width: 348px;
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
    width: 255px;
  }
`

const MainImage = styled.img`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 64px;
    right: 0;
    width: 560px;
  }

  @media (min-width: 1140px) {
    top: 0;
    right: 90px;
    width: 684px;
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

export const Payment = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Удобные расчеты</Title>
      <Descr>Автоматическое зачисление платы за сессию на вашу карту с удержанием комиссии платформы.</Descr>
      <MainImage src={mainImg} />
      <MainImageMobile src={mainImgMobile} />
    </StyledContainer>
  </Wrapper>
)
