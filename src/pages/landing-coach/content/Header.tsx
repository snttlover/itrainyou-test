import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

const Wrapper = styled.header`
  width: 100%;
  position: absolute;
`

const StyledContainer = styled(Container)`
  padding: 24px 0;
  display: flex;
  align-items: center;
  color: white;
`

export const Header = () => (
  <Wrapper>
    <StyledContainer>
      <p>Header</p>
    </StyledContainer>
  </Wrapper>
)
