import React from "react"
import styled from "styled-components"

import { routeNames } from "@/pages/route-names"

import { Container } from "../../common/Container"
import { RegisterButton } from "../../common/RegisterButton"

import bgImg from "../assets/hero/bg.svg"
import bgImgMed from "../assets/hero/bg-med.svg"
import bgImgSmall from "../assets/hero/bg-small.svg"
import mainImg from "../assets/hero/main-image.svg"

const Wrapper = styled.section`
  background: url("${bgImgSmall}");
  background-position: bottom center;
  background-size: cover;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    background: url("${bgImgMed}");
    background-position: bottom center;
    background-size: cover;
  }

  @media (min-width: 1140px) {
    background: url("${bgImg}");
    background-position: bottom center;
    background-size: cover;
  }
`

const StyledContainer = styled(Container)`
  padding-top: 164px;
  padding-bottom: 270px;
  position: relative;

  @media (min-width: 768px) {
    padding-top: 116px;
    padding-bottom: 136px;
  }

  @media (min-width: 1140px) {
    padding-top: 143px;
    padding-bottom: 174px;
  }
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;

  max-width: 288px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin: 0;
    font-size: 32px;
    line-height: 44px;
    text-align: left;

    max-width: 412px;
    margin-bottom: 8px;
  }

  @media (min-width: 1024px) {
    max-width: 534px;
  }

  @media (min-width: 1140px) {
    font-size: 40px;
    line-height: 52px;

    max-width: 534px;
    margin-bottom: 24px;
  }
`

const Descr = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #efefef;
  margin: 0 auto;

  max-width: 100%;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    text-align: left;
    margin: 0;
    margin-bottom: 24px;

    max-width: 412px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 16px;
  }

  @media (min-width: 1140px) {
    max-width: 553px;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 32px;
  }
`

const StyledRegisterButton = styled(RegisterButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  padding: 9px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 558px) {
    width: 185px;
  }

  @media (min-width: 768px) {
    width: 205px;
    padding: 12px;
    margin: 0;
    font-size: 16px;
    line-height: 24px;
  }
`

const MainImage = styled.img`
  display: block;
  position: absolute;
  bottom: -20px;
  right: 50%;
  transform: translateX(50%);
  width: 278px;

  @media (min-width: 558px) {
    bottom: 0;
  }

  @media (min-width: 768px) {
    right: 0;
    transform: translateX(0);
    bottom: 20px;
    width: 368px;
  }

  @media (min-width: 1024px) {
    bottom: 44px;
  }

  @media (min-width: 1140px) {
    right: -2px;
    bottom: -30px;
    width: 672px;
  }
`

export const Hero = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Платформа для работы с коучами</Title>
      <Descr>Первая ознакомительная сессия БЕСПЛАТНО</Descr>
      <StyledRegisterButton to={routeNames.signup("1")}>Зарегистрироваться</StyledRegisterButton>
      <MainImage src={mainImg} />
    </StyledContainer>
  </Wrapper>
)
