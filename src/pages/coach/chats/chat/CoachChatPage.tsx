import React from "react"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import styled from "styled-components"
import { CoachChat } from "@/pages/coach/chats/chat/content/coach-chat/CoachChat"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const StyledContentContainer = styled(ContentContainer)`
  height: 100%;
`

export default () => (
  <CoachDashboardLayout>
    <StyledContentContainer>
      <CoachChat />
    </StyledContentContainer>
  </CoachDashboardLayout>
)
