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
      <ChatsList />
      {params.id && <Chat />}
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
