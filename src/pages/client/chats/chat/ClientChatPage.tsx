import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import React, { useEffect } from "react"
import styled from "styled-components"
import { createChat } from "@/feature/chat"
import { clientChat } from "@/pages/client/chats/chat/client-chat.model"
import { ServerParams, START } from "@/lib/effector"
import { useEvent } from "effector-react/ssr"
import { useParams } from "react-router-dom"

const StyledContentContainer = styled(ContentContainer)`
  height: 100%;
`

const Chat = createChat(clientChat)

export const ClientChatPage = () => {
  const params = useParams<{id: string}>()
  const mounted = useEvent(clientChat.mounted)

  useEffect(() => {
    mounted(parseInt(params.id))
  }, [])


  return (
    <ClientDashboardLayout>
      <StyledContentContainer>
        <Chat />
      </StyledContentContainer>
    </ClientDashboardLayout>
  )
}

ClientChatPage[START] = clientChat.mounted.prepend<ServerParams>(({ params }) => parseInt(params.id))
