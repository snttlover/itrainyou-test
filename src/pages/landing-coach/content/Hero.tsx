import React from "react"
import styled from "styled-components"

import { routeNames } from "@/pages/route-names"

import { Container } from "../common/Container"
import { RegisterButton } from "../common/RegisterButton"

import bgImg from "../assets/hero/bg.svg"
import mainImg from "../assets/hero/main-image.png"

const Wrapper = styled.section`
  min-height: 592px;
  height: 52vw;
  background-color: #7d36a8;
  background: url("${bgImg}");
  background-size: cover;
  background-position: bottom center;
  padding: 0 0 60px;

  margin-bottom: 36px;
`

const StyledContainer = styled(Container)`
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 12%;
  position: relative;
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 52px;
  color: #ffffff;
  margin-bottom: 24px;
  max-width: 480px;
`

const Descr = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  color: #efefef;
  margin-bottom: 32px;
  max-width: 480px;
`

const StyledRegisterButton = styled(RegisterButton)`
  font-size: 16px;
  line-height: 24px;
  padding: 12px 24px;
`

const MainImage = styled.img`
  display: block;
  position: absolute;
  top: 15%;
  right: 38px;
  width: 500px;
`

export const Hero = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Доступная платформа для онлайн-коучинга</Title>
      <Descr>Инструменты для автоматизации работы с клиентами</Descr>
      <StyledRegisterButton to={routeNames.signup("1")}>Зарегистрироваться</StyledRegisterButton>
      <MainImage src={mainImg} />
    </StyledContainer>
  </Wrapper>
)
