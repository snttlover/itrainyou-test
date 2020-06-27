import {ClientDashboardLayout} from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import React from "react"
import { ClientChat } from "@/pages/client/chats/chat/content/client-chat/ClientChat"
import styled from "styled-components"

const StyledContentContainer = styled(ContentContainer)`
  height: 100%;
`

export default () => (
  <ClientDashboardLayout>
    <StyledContentContainer>
      <ClientChat />
    </StyledContentContainer>
  </ClientDashboardLayout>
)
