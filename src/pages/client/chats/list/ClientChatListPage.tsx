import React from "react"
import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import {ClientChatsList} from "@/pages/client/chats/list/container/ClientChatsList"

export default () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <ClientChatsList />
    </ContentContainer>
  </ClientDashboardLayout>
)
