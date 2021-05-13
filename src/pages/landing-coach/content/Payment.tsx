import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

// @ts-ignore
import mainImg from "../assets/payment/main.jpg"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 0px;
`

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #4858cc;
  position: relative;
  height: 417px;
`

const Title = styled.h2`
  width: 348px;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #4858cc;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
`

const Descr = styled.p`
  width: 255px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5b6670;
  position: relative;
  z-index: 2;
`

const MainImage = styled.img`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  height: 417px;
`

export const Payment = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Удобные расчеты</Title>
      <Descr>Автоматическое зачисление платы за сессию на вашу карту с удержанием комиссии платформы.</Descr>
      <MainImage src={mainImg} />
    </StyledContainer>
  </Wrapper>
)
