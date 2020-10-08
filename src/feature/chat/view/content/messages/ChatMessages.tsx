import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { useList, useStore } from "effector-react/ssr"
import { createReverseInfinityScroll } from "@/feature/pagination/view/ReverseInfinityScroll"
import { ChatMessageSwitcher } from "@/feature/chat/view/content/messages/content/ChatMessageSwitcher"

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

  return ({ isSystem, showUser, commonSystemMessages }: { isSystem?: boolean, showUser?: boolean, commonSystemMessages?: boolean }) => {
    const container = useRef<HTMLDivElement>(null)
    const messageWrapper = useRef<HTMLDivElement>(null)
    const [lastMessageId, changeLastMessage] = useState<null | number>(null)
    const [firsMessageId, changeFirstMessage] = useState<null | number>(null)
    const messages = useStore($chatMessagesModule.$messages)

    useEffect(() => {
      /* скрол к первому сообщению */
      const el = container.current
      const wrapper = messageWrapper.current
      if (el && wrapper) {
        if (lastMessageId !== messages[messages.length - 1]?.id) {
          el.scrollTop = wrapper.clientHeight
        } else if (firsMessageId !== messages[0]?.id) {
          // scroll to top
          setTimeout(() => {
            const firstMessage = wrapper.querySelector(`#message-${firsMessageId}`) as HTMLElement

            if (firstMessage) {
              el.scrollTop = firstMessage.offsetTop
            }
          }, 0)
        }
      }

      changeLastMessage(messages[messages.length - 1]?.id || null)
      changeFirstMessage(messages[0]?.id || null)
      return () => {}
    }, [messages])

    useEffect(() => {
      const el = container.current
      if (el) {
        const images = el.querySelectorAll('.message-image')
        images.forEach(image => {
          image.addEventListener('load', () => {
            el.scrollTop += image.clientHeight
          })
        })
      }
    }, [])

    return (
      <Container ref={container} id='messages'>
        <InfScroll scrollableTarget='messages'>
          <MessagesWrapper ref={messageWrapper}>
            {useList($chatMessagesModule.$messages, message => (
              <ChatMessageSwitcher message={message} isSystemChat={!!isSystem} showUser={showUser} commonSystemMessages={commonSystemMessages} />
            ))}
          </MessagesWrapper>
        </InfScroll>
      </Container>
    )
  }
}
