import React, { useEffect } from "react"
import styled from "styled-components"
import { createChatListModule } from "@/pages/client/chats/list/features/chat/modules/chat-list"
import { useEvent, useList, useStore } from "effector-react/ssr"
import { ChatLink } from "@/pages/client/chats/list/features/chat/view/components/ChatLink"
import { createInfinityScroll } from "@/pages/client/chats/list/features/pagination"


export const createChatList = ($chatListModule: ReturnType<typeof createChatListModule>) => {
  const InfScroll = createInfinityScroll($chatListModule.modules.pagination)

  return () => {
    const loadData = useEvent($chatListModule.useCases.loadChats)
    const unmounted = useEvent($chatListModule.useCases.destroy)
    const listIsEmpty = useStore($chatListModule.modules.pagination.data.$listIsEmpty)

    useEffect(() => {
      loadData()
      return () => unmounted()
    })

    return (
      <Container>
        <InfScroll>
          {useList($chatListModule.data.$chatsList, chat => (
            <ChatLink {...chat} />
          ))}
        </InfScroll>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 734px;
`
