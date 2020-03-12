import * as React from "react"
import styled from "styled-components"
import { CoachList } from "./content/CoachList"

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 80px;
  flex: 1;
  min-height: 1112px;
  padding-left: 26px;
  
  @media screen and (max-width: 963px) {
    padding-right: 26px;
  }
`

const ListContainer = styled.div`
  width: 100%;
  max-width: 640px;
`

export const List = () => (
  <Container>
    <ListContainer>
      <CoachList />
    </ListContainer>
  </Container>
)
