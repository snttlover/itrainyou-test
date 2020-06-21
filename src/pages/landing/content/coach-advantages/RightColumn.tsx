import * as React from "react"
import { Advantage } from "./Advantage"
import styled from "styled-components"

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    margin-left: -10px;
  }
  @media screen and (max-width: 580px) {
    margin-left: 0;
  }
`

const First = styled(Advantage)`
  @media screen and (max-width: 768px) {
    width: 212px;
  }
`

const Second = styled(Advantage)`
  margin-left: 40px;
  margin-right: 20px;
  @media screen and (max-width: 768px) {
    width: 167px;
  }
`

const Third = styled(Advantage)`
  margin-left: 40px;
`

const Fourth = styled(Advantage)`
  margin-right: 140px;
  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-left: 32px;
    width: 200px;
  }
`

export const RightColumn = () => (
  <Column>
    <First>Спортсменам, работающим на результат</First>
    <Second>Желающим повысить уверенность в себе</Second>
    <Third>Стремящимся научиться совмещать работу и личную жизнь</Third>
    <Fourth>Ищущим вторую половину или строящим отношения</Fourth>
  </Column>
)
