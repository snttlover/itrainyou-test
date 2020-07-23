import React, { useEffect } from "react"
import styled from "styled-components"
import { createChatListModule } from "@/feature/chats-list/modules/chat-list"
import { useEvent, useList, useStore } from "effector-react/ssr"
import { ChatLink } from "@/feature/chats-list/view/components/list/ChatLink"
import { createInfinityScroll } from "@/feature/pagination"
import { MediaRange } from "@/lib/responsive/media"
import { ChatsSearch } from "@/feature/chats-list/view/components/search/ChatsSearch"
import { ChatsSearchTabs } from "@/feature/chats-list/view/components/tabs/ChatsSearchTabs"

export const createChatList = ($chatListModule: ReturnType<typeof createChatListModule>) => {
  const InfScroll = createInfinityScroll($chatListModule.modules.pagination)

  return () => {
    const loadData = useEvent($chatListModule.methods.loadChats)
    const listIsEmpty = useStore($chatListModule.modules.pagination.data.$listIsEmpty)

    useEffect(() => {
      loadData()
    })

    return (
      <>
        <Container>
          <ChatsSearch />
          <ChatsSearchTabs />
          {listIsEmpty && <ListIsEmpty />}
          <InfScroll>
            {useList($chatListModule.data.$chatsList, chat => (
              <ChatLink {...chat} />
            ))}
          </InfScroll>
        </Container>
      </>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 734px;
`

const ListIsEmpty = () => {
  return <Empty>По вашему запросу ничего не найдено</Empty>
}

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 120px;

  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #9aa0a6;

  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 22px;
  `}
`
