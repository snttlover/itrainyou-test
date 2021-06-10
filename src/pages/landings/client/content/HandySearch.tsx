import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"

import mainImg from "../assets/handy-search/search.png"
import mainImgMobile from "../assets/handy-search/search-mobile.png"

const Wrapper = styled.section`
  background: white;

  margin-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: 213px;
  }
  @media (min-width: 1140px) {
    margin-bottom: 233px;
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
  width: 245px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`

const MainImage = styled.img`
  display: none;

  @media (min-width: 1140px) {
    display: block;
    position: absolute;
    top: 0;
    right: 20px;
    width: 746px;
  }
`

const MainImageMobile = styled.img`
  display: block;
  width: 288px;
  margin: 0 auto;

  @media (min-width: 558px) {
    margin: 0;
    margin-left: auto;
  }

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 6px;
    right: 0;
    width: 536px;
  }

  @media (min-width: 1140px) {
    display: none;
  }
`

export const HandySearch = () => (
  <Wrapper>
    <StyledContainer>
      <Title>Удобный поиск</Title>
      <Descr>Выбирайте коучей по направлению, цене и времени за несколько кликов.</Descr>
      <MainImage src={mainImg} />
      <MainImageMobile src={mainImgMobile} />
    </StyledContainer>
  </Wrapper>
)
