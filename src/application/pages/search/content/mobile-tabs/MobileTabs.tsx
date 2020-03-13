import * as React from "react"
import styled from "styled-components"
import { changeMobileFiltersVisibility } from "./mobile-tabs.model"

const Container = styled.div`
  display: none;
  width: 100%;
  @media screen and (max-width: 480px) {
    display: flex;
  }
`

const Tab = styled.div`
  background: #daebf7;
  border: 1px solid #a3cff3;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex: 1;
`

export const MobileTabs = () => {
  return (
    <Container>
      <Tab>Сортировка</Tab>
      <Tab onClick={() => changeMobileFiltersVisibility(true)}>Фильтры</Tab>
    </Container>
  )
}
