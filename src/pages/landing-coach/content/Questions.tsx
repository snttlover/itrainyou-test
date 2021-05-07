import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

const Wrapper = styled.section`
  height: 564px;
  background: #f4f5f7;
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4858cc;
`

export const Questions = () => (
  <Wrapper>
    <StyledContainer>
      <p>Questions</p>
    </StyledContainer>
  </Wrapper>
)
