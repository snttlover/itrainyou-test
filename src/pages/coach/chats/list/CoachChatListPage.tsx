import React from "react"
import { createChatList } from "@/feature/chats-list"
import { coachChatsList } from "@/pages/coach/chats/list/coach-chats-list.module"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { createChat } from "@/feature/chat"
import { coachChat } from "@/pages/coach/chats/chat/coach-chat.model"

const ChatsList = createChatList(coachChatsList)

const Chat = createChat(coachChat)

export const CoachChatListPage = () => {
  const params = useParams<{ id: string }>()

  return (
    <Content>
      <ChatsWrapper>
        <ChatsList />
        {params.id ? <Chat /> : <Empty>Выберите чат</Empty>}
      </ChatsWrapper>
    </Content>
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

const Empty = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #9aa0a6;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
