import * as React from "react"
import styled from "styled-components"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { Link } from "@reach/router"
import { loadCoaches, setSearchPageQuery } from "@app/pages/search/coaches-search.model"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StyledButton = styled(DashedButton)`
  width: 160px;
`

export const ResetFiltersButton = () => {
  const clickHandler = () => {
    setSearchPageQuery({})
    loadCoaches({})
  }

  return (
    <Container>
      <Link to='/search' onClick={clickHandler}>
        <StyledButton>Сбросить</StyledButton>
      </Link>
    </Container>
  )
}
