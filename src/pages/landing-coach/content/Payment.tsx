import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

const Wrapper = styled.section`
  height: 491px;
  background: white;
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4858cc;
`

export const Payment = () => (
  <Wrapper>
    <StyledContainer>
      <p>Payment</p>
    </StyledContainer>
  </Wrapper>
)
