import * as React from "react"
import styled from "styled-components"
import {List} from "./list/List"
import {Filters} from "./filters/Filters"

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 100px;
  display: flex;
`

export const Content = () => (
  <Container>
    <List />
    <Filters />
  </Container>
)
