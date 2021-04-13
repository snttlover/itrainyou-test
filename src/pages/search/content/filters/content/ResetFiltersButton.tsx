import * as React from "react"
import styled from "styled-components"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { useHistory } from "react-router-dom"

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
  const history = useHistory()
  const clickHandler = () => {
    history.replace("/search")
  }

  return (
    <Container className={props.className}>
      <StyledButton onClick={() => clickHandler()}>Сбросить</StyledButton>
    </Container>
  )
}
