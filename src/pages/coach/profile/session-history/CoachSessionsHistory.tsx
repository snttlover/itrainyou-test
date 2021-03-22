import { ProfileTabs } from "@/pages/coach/profile/common/ProfileTabs"
import { TabsContainer } from "@/pages/coach/profile/common/TabsContainer"
import { IndividualSessions } from "@/pages/coach/profile/session-history/sessions-list/IndividualSessions"
import React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { ProfileCreditCards } from "@/pages/client/profile/content/credit-cards/CreditCards"

export const CoachSessionsHistory = () => (
  <CoachDashboardLayout>
    <ContentContainer>
      <TabsContainer>
        <ProfileTabs />
      </TabsContainer>
      <ProfileCreditCards userType={"coach"} />
      <IndividualSessions />
    </ContentContainer>
  </CoachDashboardLayout>
)
