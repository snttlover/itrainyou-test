import * as React from "react"
import { Advantage } from "./Advantage"
import styled from "styled-components"

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    margin-right: -10px;
  }
`

const First = styled(Advantage)`
  margin-left: 56px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`

const Second = styled(Advantage)`
  margin-right: 40px;
  @media screen and (max-width: 768px) {
    width: 200px;
  }
`

const Third = styled(Advantage)`
  margin-right: 40px;
  @media screen and (max-width: 768px) {
    margin-left: 8px;
  }
`

const Fourth = styled(Advantage)`
  margin-left: 121px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-right: 28px;
  }
`

export const LeftColumn = () => (
  <Column>
    <First>
      Успешным предпринимателям, стремящимся перейти на новый уровень развития
    </First>
    <Second>Менеджерам, которые хотят достичь большего</Second>
    <Third>Людям, которые понимают, что что-то мешает двигаться вперед</Third>
    <Fourth>Уставшим от рутины и однообразия</Fourth>
  </Column>
)
