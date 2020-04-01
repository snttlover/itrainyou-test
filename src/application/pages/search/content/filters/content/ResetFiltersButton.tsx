import * as React from "react"
import styled from "styled-components"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import Router from "next/router"

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
    Router.replace(`/search`)
  }

  return (
    <Container className={props.className}>
      <StyledButton onClick={() => clickHandler()}>Сбросить</StyledButton>
    </Container>
  )
}
