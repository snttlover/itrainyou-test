import React from "react"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import styled from "styled-components"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { createChat } from "@/feature/chat"
import { clientChat } from "@/pages/client/chats/chat/client-chat.model"
import { coachChat } from "@/pages/coach/chats/chat/coach-chat.model"

const StyledContentContainer = styled(ContentContainer)`
  height: 100%;
`

const Chat = createChat(coachChat)

export const CoachChatPage =  () => (
  <CoachDashboardLayout>
    <StyledContentContainer>
      <Chat />
    </StyledContentContainer>
  </CoachDashboardLayout>
)
