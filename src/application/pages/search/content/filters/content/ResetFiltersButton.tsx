import * as React from "react"
import styled from "styled-components"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { Link } from "@reach/router"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StyledButton = styled(DashedButton)`
  width: 160px;
`

export const ResetFiltersButton = () => (
  <Container>
    <Link to='/search'>
      <StyledButton>Сбросить</StyledButton>
    </Link>
  </Container>
)
