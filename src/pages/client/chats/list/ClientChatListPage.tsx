import React from "react"
import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import { createChatList } from "@/feature/chats-list"
import { clientChatsList } from "@/pages/client/chats/list/client-chats-list.module"

const ChatsList = createChatList(clientChatsList)

export default () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <ChatsList />
    </ContentContainer>
  </ClientDashboardLayout>
)
