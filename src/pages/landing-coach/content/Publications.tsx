import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

const Wrapper = styled.section`
  height: 480px;
  background: #4858cc;
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export const Publications = () => (
  <Wrapper>
    <StyledContainer>
      <p>Publications</p>
    </StyledContainer>
  </Wrapper>
)
