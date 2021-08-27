import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { useList, useStore } from "effector-react"
import { createReverseInfinityScroll } from "@/feature/pagination/view/ReverseInfinityScroll"
import { ChatMessageSwitcher } from "@/feature/chat/view/content/messages/content/ChatMessageSwitcher"
import { ChatContentContainer } from "@/feature/chat/view/content/messages/content/ChatContentContainer"
import { useSplittedStore } from "@/lib/effector/use-split-store"
import dayjs from "dayjs"
import { date } from "@/lib/formatting/date"

const Container = styled.div`
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  align-items: flex-start;
  display: block;
  position: relative;
  overflow: auto;
  background: #f4f5f7;
`

const MessagesWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 20px 0;
`

export const createChatMessages = ($chatMessagesModule: ReturnType<typeof createChatMessagesModule>) => {
  const InfScroll = createReverseInfinityScroll($chatMessagesModule.pagination)
  return ({
    isSystem,
    showUser,
    commonSystemMessages,
    imageClick,
  }: {
    isSystem?: boolean
    showUser?: boolean
    commonSystemMessages?: boolean
    imageClick?: (index: number) => void
  }) => {
    const container = useRef<HTMLDivElement>(null)
    const messageWrapper = useRef<HTMLDivElement>(null)
    const [lastMessageId, changeLastMessage] = useState<null | number>(null)
    const [firsMessageId, changeFirstMessage] = useState<null | number>(null)
    const messages = useStore($chatMessagesModule.$messages)
    const empty = useStore($chatMessagesModule.pagination.data.$listIsEmpty)

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
      return () => { }
    }, [messages])

    useEffect(() => {
      const el = container.current
      if (el) {
        const images = el.querySelectorAll(".message-image")
        images.forEach(image => {
          image.addEventListener("load", () => {
            el.scrollTop += image.clientHeight
          })
        })
      }
    }, [])

    const splittedMessages = useSplittedStore({
      store: $chatMessagesModule.$messages,
      splitter: message => {
        if (date(message.date).isAfter(date().startOf("day"))) {
          return "Сегодня"
        }
        return date(message.date).format("DD MMMM")
      },
    })
    return (
      <Container ref={container} id='messages'>
        {empty && <Empty>Пока нет сообщений</Empty>}
        <ScrollWrapper>
          <InfScroll scrollableTarget='messages'>
            <ChatContentContainer>
              <MessagesWrapper ref={messageWrapper}>
                {splittedMessages.keys.map(day => (
                  <MessagesByDate key={day}>
                    <Day>{day}</Day>
                    {splittedMessages.splitted(day).map(message => (
                      <ChatMessageSwitcher
                        key={message.id}
                        message={message}
                        isSystemChat={!!isSystem}
                        showUser={showUser}
                        commonSystemMessages={commonSystemMessages}
                        imageClick={imageClick}
                      />
                    ))}
                  </MessagesByDate>
                ))}
              </MessagesWrapper>
            </ChatContentContainer>
          </InfScroll>
        </ScrollWrapper>
      </Container>
    )
  }
}

const Day = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #5b6670;
  margin: 8px;
  text-align: center;
`

const MessagesByDate = styled.div`
  display: flex;
  flex-direction: column;
`

const ScrollWrapper = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
`

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  color: #9aa0a6;
`
