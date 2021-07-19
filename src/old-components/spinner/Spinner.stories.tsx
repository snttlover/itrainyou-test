import { Spinner } from "./Spinner"
import styled from "styled-components"
import * as React from "react"

export default {
  component: Spinner,
  title: "Spinner"
}

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: #333;
  position: relative;
`

export const normal = () => (
  <Container>
    <Spinner />
  </Container>
)
