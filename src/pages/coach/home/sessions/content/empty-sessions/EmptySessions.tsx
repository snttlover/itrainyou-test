import styled from "styled-components"
import emptyImage from "./images/empty.svg"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"

const Container = styled.div``

const Image = styled.img.attrs({ src: emptyImage })`
  width: 100px;
  height: 171.81px;
  margin-bottom: 40px;
  ${MediaRange.lessThan("mobile")`
    margin-bottom: 36px;
  `}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  ${MediaRange.lessThan("mobile")`
    padding-top: 36px;
  `}
`

const Text = styled.div`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #9aa0a6;
  ${MediaRange.lessThan("mobile")` 
    font-size: 14px;
    line-height: 18px;
  `}
`

export const EmptySessions = () => (
  <Container>
    <Content>
      <Image />
      <Text>На ваши занятия пока никто не записался</Text>
    </Content>
  </Container>
)
