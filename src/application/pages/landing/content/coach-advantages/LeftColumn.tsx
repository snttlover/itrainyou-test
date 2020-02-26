import * as React from "react"
import { Advantage } from "./Advantage"
import styled from "styled-components"

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
`

const First = styled(Advantage)`
  margin-left: 56px;
`

const Second = styled(Advantage)`
  margin-right: 40px;
`

const Third = styled(Advantage)`
  margin-right: 40px;
`

const Fourth = styled(Advantage)`
  margin-left: 121px;
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
