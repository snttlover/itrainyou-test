import React from "react"
import { ClientDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { createChatList } from "@/feature/chats-list"
import { clientChatsList } from "@/pages/client/chats/list/client-chats-list.module"
import { createChat } from "@/feature/chat"
import { clientChat } from "@/pages/client/chats/chat/client-chat.model"
import { useParams } from "react-router-dom"
import styled from "styled-components"

const ChatsList = createChatList(clientChatsList)

const Chat = createChat(clientChat)

export default () => {
  const params = useParams<{ id: string }>()

  return (
    <ClientDashboardLayout>
      <Content>
        <ChatsWrapper>
          <ChatsList />
          {params.id && <Chat />}
        </ChatsWrapper>
      </Content>
    </ClientDashboardLayout>
  )
}

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  position: relative;
`

const ChatsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #fff;
`
