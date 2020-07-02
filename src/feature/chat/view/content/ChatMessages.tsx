import React from "react"
import styled from "styled-components"
import { ChatMessage } from "@/pages/client/chats/chat/content/client-chat/content/ChatMessage"
import { MediaRange } from "@/lib/responsive/media"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { createInfinityScroll } from "@/feature/pagination"
import { useList } from "effector-react/ssr"

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

export const createChatMessages = ($chatMessagesModule: ReturnType<typeof createChatMessagesModule>) => {
  const InfScroll = createInfinityScroll($chatMessagesModule.pagination)

  return () => (
    <Container>
      <InfScroll>
        {useList($chatMessagesModule.$messages, message => (
          <ChatMessage time={message.time} data-self={message.isMine}>
            {message.text}
          </ChatMessage>
        ))}
      </InfScroll>
    </Container>
  )
}
