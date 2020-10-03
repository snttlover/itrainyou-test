import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import React from "react"
import styled from "styled-components"
import { createChat } from "@/feature/chat"
import { clientChat } from "@/pages/client/chats/chat/client-chat.model"

const StyledContentContainer = styled(ContentContainer)`
  height: 100%;
`

const Chat = createChat(clientChat)

export const ClientChatPage = () => {

  return (
    <ClientDashboardLayout>
      <StyledContentContainer>
        <Chat />
      </StyledContentContainer>
    </ClientDashboardLayout>
  )
}

