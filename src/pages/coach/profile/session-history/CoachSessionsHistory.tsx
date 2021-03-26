import { ProfileTabs } from "@/pages/coach/profile/common/ProfileTabs"
import { TabsContainer } from "@/pages/coach/profile/common/TabsContainer"
import { IndividualSessions } from "@/pages/coach/profile/session-history/sessions-list/IndividualSessions"
import React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { ProfileCreditCards } from "@/pages/client/profile/content/credit-cards/CreditCards"
import {AddTinkoffCardDialog} from "@/pages/coach/home/tinkoff/AddCardDialog"
import { useStore } from "effector-react"
import { $coachAccess } from "@/feature/user/user.model"

export const CoachSessionsHistory = () => {
  const paymentSystem = useStore($coachAccess).paymentSystem

  return (
    <CoachDashboardLayout>
      <ContentContainer>
        <TabsContainer>
          <ProfileTabs />
        </TabsContainer>
        <AddTinkoffCardDialog />
        {paymentSystem === "TINKOFF" ? <ProfileCreditCards userType={"coach"} /> : null}
        <IndividualSessions />
      </ContentContainer>
    </CoachDashboardLayout>
  )}
