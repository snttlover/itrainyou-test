import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

const Wrapper = styled.footer`
  height: 200px;
  background: linear-gradient(101.34deg, #4858cc -7.8%, #7d36a8 114.56%);
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export const Footer = () => (
  <Wrapper>
    <StyledContainer>
      <p>Footer</p>
    </StyledContainer>
  </Wrapper>
)
