import React from "react"
import styled from "styled-components"

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

const coaches = [
  {
    id: 1,
    first_name: "Денис",
    last_name: "Денисов",
    rating: 3.62,
    reviews_count: 13,
    avatar: "#b00b69",
    categories: [
      {
        id: 1,
        name: "Бизнес коучинг",
      },
      {
        id: 2,
        name: "Лайф коучинг",
      },
      {
        id: 3,
        name: "Семейный коучинг",
      },
    ],
  },
  {
    id: 2,
    first_name: "Денис",
    last_name: "Денисов",
    rating: 3.62,
    reviews_count: 13,
    avatar: "#b00b69",
    categories: [
      {
        id: 1,
        name: "Бизнес коучинг",
      },
      {
        id: 2,
        name: "Лайф коучинг",
      },
      {
        id: 3,
        name: "Семейный коучинг",
      },
    ],
  },
  {
    id: 3,
    first_name: "Денис",
    last_name: "Денисов",
    rating: 3.62,
    reviews_count: 13,
    avatar: "#b00b69",
    categories: [
      {
        id: 1,
        name: "Бизнес коучинг",
      },
      {
        id: 2,
        name: "Лайф коучинг",
      },
      {
        id: 3,
        name: "Семейный коучинг",
      },
    ],
  },
  {
    id: 4,
    first_name: "Денис",
    last_name: "Денисов",
    rating: 3.62,
    reviews_count: 13,
    avatar: "#b00b69",
    categories: [
      {
        id: 1,
        name: "Бизнес коучинг",
      },
      {
        id: 2,
        name: "Лайф коучинг",
      },
      {
        id: 3,
        name: "Семейный коучинг",
      },
    ],
  },
  {
    id: 5,
    first_name: "Денис",
    last_name: "Денисов",
    rating: 3.62,
    reviews_count: 13,
    avatar: "#b00b69",
    categories: [
      {
        id: 1,
        name: "Бизнес коучинг",
      },
      {
        id: 2,
        name: "Лайф коучинг",
      },
      {
        id: 3,
        name: "Семейный коучинг",
      },
    ],
  },
]

export const CoachList = () => {
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
