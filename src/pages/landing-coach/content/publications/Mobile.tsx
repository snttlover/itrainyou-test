import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"

const StyledContainer = styled(Container)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

export const Mobile = ({ className }: any) => <StyledContainer className={className}>Mobile</StyledContainer>
