import React from "react"
import { ClientDashboardLayout } from "#/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "#/components/layouts/ContentContainer"
import { createChatList } from "#/feature/chats-list"
import { clientChatsList } from "#/pages/client/chats/list/client-chats-list.module"

const ChatsList = createChatList(clientChatsList)

export default () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <ChatsList />
    </ContentContainer>
  </ClientDashboardLayout>
)
