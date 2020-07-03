import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ChatMessage } from "@/pages/client/chats/chat/content/client-chat/content/ChatMessage"
import { MediaRange } from "@/lib/responsive/media"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { useList, useStore } from "effector-react/ssr"
import { createReverseInfinityScroll } from "@/feature/pagination/view/ReverseInfinityScroll"

const Container = styled.div`
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  padding: 16px 24px;
  align-items: flex-start;
  display: block;
  position: relative;
  overflow: auto;
  ${MediaRange.lessThan(`mobile`)`
    padding: 12px 8px;
  `}
`

const MessagesWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const createChatMessages = ($chatMessagesModule: ReturnType<typeof createChatMessagesModule>) => {
  const InfScroll = createReverseInfinityScroll($chatMessagesModule.pagination)

  return () => {

    /* scroll to start where first message is not start */
    const container = useRef<HTMLDivElement>(null)
    const messageWrapper = useRef<HTMLDivElement>(null)
    const [lastMessageId, changeLastMessage] = useState<null | number>(null)
    const messages = useStore($chatMessagesModule.$messages)

    useEffect(() => {
      const el = container.current
      const wrapper = messageWrapper.current
      if (el && wrapper && lastMessageId !== messages[messages.length - 1]?.id) {
        el.scrollTop = wrapper.clientHeight
      }
      changeLastMessage(messages[messages.length - 1]?.id || null)
      return () => {}
    })

    return (
      <Container ref={container} id='messages'>
        <InfScroll scrollableTarget='messages'>
          <MessagesWrapper ref={messageWrapper}>
            {useList($chatMessagesModule.$messages, message => (
              <ChatMessage time={message.time} data-self={message.isMine}>
                {message.text}
              </ChatMessage>
            ))}
          </MessagesWrapper>
        </InfScroll>
      </Container>
    )
  }
}
