import * as React from "react"
import styled from "styled-components"
import {List} from "./list/List"
import {Filters} from "./filters/Filters"

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 20px;
  display: flex;
  @media screen and (max-width: 480px) {
    padding: 16px;
  }
`

type ContentPros = {
  freeSessions?: boolean
}

export const Content = ({ freeSessions }: ContentPros) => (
  <Container>
    <List freeSessions={freeSessions} />
  </Container>
)
