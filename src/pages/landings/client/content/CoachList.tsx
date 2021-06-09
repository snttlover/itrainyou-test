import React from "react"
import styled from "styled-components"

import { useStore } from "effector-react"

import { $coachesList } from "./coach-list/model"

import { Container } from "../../common/Container"
import { Slider } from "./coach-list/Slider"

const Wrapper = styled.section`
  background: white;
  position: relative;
  height: 528px;

  @media (min-width: 768px) {
    height: 632px;
  }

  @media (min-width: 1140px) {
    height: 710px;
  }
`

const StyledContainer = styled(Container)`
  position: relative;
  height: 100%;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #4858cc;
  padding-top: 40px;
  text-align: center;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    padding-top: 80px;
  }

  @media (min-width: 1140px) {
    padding-top: 120px;
  }
`

const SliderWrapper = styled.div`
  display: block;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;

  @media (min-width: 768px) {
    bottom: 70px;
  }

  @media (min-width: 1140px) {
    bottom: 108px;
  }
`

export const CoachList = () => {
  const coaches = useStore($coachesList)

  return (
    <Wrapper>
      <StyledContainer>
        <Title>Наши коучи</Title>
      </StyledContainer>
      <SliderWrapper>
        <Slider coaches={coaches} />
      </SliderWrapper>
    </Wrapper>
  )
}
