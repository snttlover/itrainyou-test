import React, { useEffect } from "react"
import styled from "styled-components"
import { createChatListModule } from "@/feature/chats-list/modules/chat-list"
import { useEvent, useList, useStore } from "effector-react"
import { createInfinityScroll } from "@/feature/pagination"
import { MediaRange } from "@/lib/responsive/media"
import { ChatsSearch } from "@/feature/chats-list/view/components/search/ChatsSearch"
import { ChatsSearchTabs } from "@/feature/chats-list/view/components/tabs/ChatsSearchTabs"
import { ChatLinkSwitcher } from "@/feature/chats-list/view/components/list/ChatLinkSwitcher"

export const createChatList = ($chatListModule: ReturnType<typeof createChatListModule>) => {
  const InfScroll = createInfinityScroll($chatListModule.modules.pagination)

  return () => {
    const loadData = useEvent($chatListModule.methods.loadChats)
    const listIsEmpty = useStore($chatListModule.modules.pagination.data.$listIsEmpty)

    const find = useEvent($chatListModule.methods.findChats)

    const search = useStore($chatListModule.data.$search)
    const changeSearch = useEvent($chatListModule.methods.changeSearch)

    const tab = useStore($chatListModule.data.$tab)
    const changeTab = useEvent($chatListModule.methods.changeTab)

    useEffect(() => {
      loadData()
    })

    return (
      <>
        <Container>
          <ChatsSearch value={search} onChange={changeSearch} find={find} />
          <ChatsSearchTabs
            value={tab}
            onChange={changeTab}
            find={find}
            showChosen={$chatListModule.data.type === "client"}
          />
          <ChatLinksContainer>
            {listIsEmpty && <ListIsEmpty />}
            <InfScroll>
              {useList($chatListModule.data.$chatsList, chat => (
                <ChatLinkSwitcher chat={chat} />
              ))}
            </InfScroll>
          </ChatLinksContainer>
        </Container>
      </>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  position: relative;
  border-radius: 8px 0px 0px 8px;
  background: #fff;
  overflow: hidden;
  border-right: 1px solid #e1e6ea;
`

const ListIsEmpty = () => {
  return <Empty>По вашему запросу ничего не найдено</Empty>
}

const ChatLinksContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  ${MediaRange.lessThan("mobile")`
    margin-top: 14px;
  `}
`

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  line-height: 16px;
  color: #9aa0a6;
  width: 100%;
  height: 100%;
`
