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

export const BeforeAfter = () => (
  <Wrapper>
    <StyledContainer>
      <p>BeforeAfter</p>
    </StyledContainer>
  </Wrapper>
)
