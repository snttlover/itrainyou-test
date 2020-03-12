import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-right: 220px;
  padding: 20px 80px 20px 26px;

  @media screen and (max-width: 963px) {
    padding-right: 26px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

const StyledSorting = styled.div`
  width: 100%;
  max-width: 640px;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`

export const Sorting = () => (
  <Container>
    <StyledSorting>6 коучей отсортировано по количеству отзывов</StyledSorting>
  </Container>
)
