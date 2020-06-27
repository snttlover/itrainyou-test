import React from "react"
import styled from "styled-components"
import { ChatMessage } from "@/pages/client/chats/chat/content/client-chat/content/ChatMessage"
import {MediaRange} from "@/lib/responsive/media"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  padding: 16px 24px;
  align-items: flex-start;
  ${MediaRange.lessThan(`mobile`)`
    padding: 12px 8px;
  `}
`

export const ChatMessages = () => (
  <Container>
    <ChatMessage time='12:00' data-self={false}>
      Sint ex sint laborum reprehenderit. Deserunt cupidatat nulla incididunt fugiat officia officia nulla elit
      adipisicing aliquip exercitation.
    </ChatMessage>

    <ChatMessage time='12:00' data-self={true}>
      Sint ex sint laborum reprehenderit. Deserunt cupidatat nulla incididunt fugiat officia officia nulla elit
      adipisicing aliquip exercitation.
    </ChatMessage>

    <ChatMessage time='12:00' data-self={true}>
      Sint ex sint laborum reprehenderit.
    </ChatMessage>
  </Container>
)
