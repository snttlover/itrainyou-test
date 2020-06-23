import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import React from "react"
import styled from "styled-components"
import { CoachChat } from "@/application/pages/coach/chats/chat/content/coach-chat/CoachChat"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

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
