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
  margin-bottom: 123px;

  @media (min-width: 768px) {
    background: url("${bgImgMed}");
    background-position: bottom center;
    background-size: cover;
    margin-bottom: 40px;
  }

  @media (min-width: 1140px) {
    background: url("${bgImg}");
    background-position: bottom center;
    background-size: cover;
    margin-bottom: 76px;
  }
`

const StyledContainer = styled(Container)`
  padding-top: 164px;
  padding-bottom: 181px;
  position: relative;

  @media (min-width: 558px) {
    padding-top: 164px;
    padding-bottom: 237px;
  }

  @media (min-width: 768px) {
    padding-top: 116px;
    padding-bottom: 134px;
  }

  @media (min-width: 1140px) {
    padding-top: 130px;
    padding-bottom: 226px;
  }
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;

  max-width: 278px;
  margin-bottom: 16px;

  @media (min-width: 558px) {
    max-width: 100%;
  }

  @media (min-width: 768px) {
    margin: 0;
    font-size: 32px;
    line-height: 44px;
    text-align: left;

    max-width: 402px;
    margin-bottom: 8px;
  }

  @media (min-width: 1140px) {
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

  max-width: 288px;
  margin-bottom: 24px;

  @media (min-width: 558px) {
    max-width: 100%;
  }

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 32px;
    text-align: left;
    margin: 0;
    margin-bottom: 24px;

    max-width: 412px;
  }

  @media (min-width: 1140px) {
    max-width: 553px;

    margin-bottom: 44px;
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
  bottom: -54px;
  right: 50%;
  transform: translateX(50%);
  width: 278px;

  @media (min-width: 558px) {
    bottom: -69px;
  }

  @media (min-width: 768px) {
    right: 10px;
    transform: translateX(0);
    bottom: 70px;
    width: 377px;
  }

  @media (min-width: 1140px) {
    right: 41px;
    bottom: 33px;
    width: 508px;
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
