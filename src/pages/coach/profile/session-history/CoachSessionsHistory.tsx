import { ProfileTabs } from "@/pages/coach/profile/common/ProfileTabs"
import { TabsContainer } from "@/pages/coach/profile/common/TabsContainer"
import React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"

export const CoachSessionsHistory = () => (
  <CoachDashboardLayout>
    <ContentContainer>
      <TabsContainer>
        <ProfileTabs />
      </TabsContainer>
    </ContentContainer>
  </CoachDashboardLayout>
)
