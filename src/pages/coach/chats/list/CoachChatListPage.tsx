import React from "react"
import {ContentContainer} from "@/components/layouts/ContentContainer"
import { CoachChatsList } from "@/pages/coach/chats/list/container/CoachChatsList"
import {CoachDashboardLayout} from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

export default () => (
  <CoachDashboardLayout>
    <ContentContainer>
      <CoachChatsList />
    </ContentContainer>
  </CoachDashboardLayout>
)
