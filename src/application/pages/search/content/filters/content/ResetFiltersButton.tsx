import * as React from "react"
import styled from "styled-components"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { Link } from "@reach/router"
import { loadCoaches, setSearchPageQuery } from "@app/pages/search/coaches-search.model"
import { resetCategories } from "@app/pages/landing/content/top-bar/categories-picker/categories-picker.model"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StyledButton = styled(DashedButton)`
  width: 160px;
`

type ResetFiltersButtonTypes = {
  className?: string
}

export const ResetFiltersButton = (props: ResetFiltersButtonTypes) => {
  const clickHandler = () => {
    setSearchPageQuery({})
    loadCoaches({})
    resetCategories()
  }

  return (
    <Container className={props.className}>
      <Link to='/search' onClick={clickHandler}>
        <StyledButton>Сбросить</StyledButton>
      </Link>
    </Container>
  )
}
