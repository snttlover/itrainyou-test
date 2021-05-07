import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

const Wrapper = styled.section`
  height: 592px;
  background: linear-gradient(90deg, #7d36a8 0%, #7d36a8 67%, #7d36a8 100%);
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export const Hero = () => (
  <Wrapper>
    <StyledContainer>
      <p>Hero</p>
    </StyledContainer>
  </Wrapper>
)
