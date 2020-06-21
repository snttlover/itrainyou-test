import { ClientDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import React from "react"
import { ClientChat } from "@/application/pages/client/chats/chat/content/client-chat/ClientChat"

export default () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <ClientChat />
    </ContentContainer>
  </ClientDashboardLayout>
)
