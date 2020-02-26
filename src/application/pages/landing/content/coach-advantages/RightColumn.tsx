import * as React from "react"
import { Advantage } from "./Advantage"
import styled from "styled-components"

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`

const First = styled(Advantage)`
`

const Second = styled(Advantage)`
  margin-left: 40px;
  margin-right: 20px;
`

const Third = styled(Advantage)`
  margin-left: 40px;
`

const Fourth = styled(Advantage)`
  margin-right: 140px;
`

export const RightColumn = () => (
  <Column>
    <First>Спортсменам, работающим на результат</First>
    <Second>Желающим повысить уверенность в себе</Second>
    <Third>Стремящимся научиться совмещать работу и личную жизнь</Third>
    <Fourth>Ищущим вторую половину или строящим отношения</Fourth>
  </Column>
)
