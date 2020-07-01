import React from "react"
import {ContentContainer} from "@/components/layouts/ContentContainer"
import { createChatList } from "@/pages/client/chats/list/features/chat"
import { coachChatsList } from "@/pages/coach/chats/list/coach-chats-list.module"

const ChatsList = createChatList(coachChatsList)

export const CoachChatListPage = () => (
  <ContentContainer>
    <ChatsList />
  </ContentContainer>
)
