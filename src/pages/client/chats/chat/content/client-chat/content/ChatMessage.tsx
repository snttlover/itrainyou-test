import React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

type ContainerTypes = {
  "data-self": boolean
}

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: rgba(66, 66, 66, 0.5);
`

const Container = styled.div<ContainerTypes>`
  padding: 5px 8px;

  background: #F4F5F7;
  border-radius: 12px 12px 12px 0px;
  width: auto;
  max-width: 472px;
  color: #424242;
  margin-bottom: 8px;

  font-size: 16px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-start;
  position: relative;

  &[data-self="true"] {
    background: ${props => props.theme.colors.primary};
    border-radius: 12px 12px 0px 12px;
    color: #ffffff;
    align-self: flex-end;
    ${Time} {
      color: #9aa0a6;
    }
  }

  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 22px;
    ${Time} {
      font-size: 12px;
    }
  `}
`

const Text = styled.div`
  white-space: pre-wrap;
  width: 100%;
  word-break: break-word;
`

type ChatMessageTypes = {
  children: React.ReactChild
  time: string
  id?: string
} & ContainerTypes

export const ChatMessage = (props: ChatMessageTypes) => (
  <Container id={props.id} data-self={props["data-self"]}>
    <Text>{props.children}</Text>
    <Time>{props.time}</Time>
  </Container>
)
