import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

// @ts-ignore
import mainImg from "../assets/calendar/main.jpg"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 64px;
`

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #4858cc;
  position: relative;
  height: 258px;
`

const TextWrapper = styled.div`
  width: 465px;
`

const Title = styled.h2`
  width: 465px;
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
  top: -60px;
  left: 0;
  height: 318px;
`

export const Calendar = () => (
  <Wrapper>
    <StyledContainer>
      <TextWrapper>
        <Title>Календарь синхронизируется с вашими планами в Google</Title>
        <Descr>
          Подключить свой календарь? Легко! Теперь все запланированные события можно увидеть в одном месте - личном
          кабинете на платформе iTrainYou
        </Descr>
      </TextWrapper>
      <MainImage src={mainImg} />
    </StyledContainer>
  </Wrapper>
)
