import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"

import { Slider } from "./coach-list/Slider"

const Wrapper = styled.section`
  width: 100%;
  height: 400px;
`

const StyledContainer = styled(Container)``

const coaches = [
  {
    id: 1,
    name: "Евгения Петрова",
    rating: 4.9,
    reviews: 113,
    tags: ["Семейный коучинг", "Спортивный коучинг", "Лайф коучинг"],
  },
  {
    id: 2,
    name: "Евгения Петрова",
    rating: 4.9,
    reviews: 113,
    tags: ["Семейный коучинг", "Спортивный коучинг", "Лайф коучинг"],
  },
  {
    id: 3,
    name: "Евгения Петрова",
    rating: 4.9,
    reviews: 113,
    tags: ["Семейный коучинг", "Спортивный коучинг", "Лайф коучинг"],
  },
  {
    id: 4,
    name: "Евгения Петрова",
    rating: 4.9,
    reviews: 113,
    tags: ["Семейный коучинг", "Спортивный коучинг", "Лайф коучинг"],
  },
]

export const CoachList = () => (
  <Wrapper>
    <StyledContainer>Coach List</StyledContainer>
    <Slider coaches={coaches} />
  </Wrapper>
)
