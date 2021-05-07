import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

const Wrapper = styled.section`
  height: 584px;
  background: #4858cc;

  margin-bottom: 110px;
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export const Features = () => (
  <Wrapper>
    <StyledContainer>
      <p>Features</p>
    </StyledContainer>
  </Wrapper>
)
