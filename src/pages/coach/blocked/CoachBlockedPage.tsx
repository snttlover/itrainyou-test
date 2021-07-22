import { ContentContainer } from "@/old-components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import { $coachAccess } from "@/feature/user/user.model"
import { BlockedClients } from "@/pages/coach/blocked/BlockedClients"
import { useStore } from "effector-react"
import * as React from "react"
import { CoachDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const features = ["Смотреть список заблокированных клиентов", "Разблокировать клиентов"]

export const CoachBlockedPage = () => {
  const coachAccess = useStore($coachAccess)
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        {coachAccess.isApproved ? (
          <BlockedClients />
        ) : (
          <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
        )}
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachBlockedPage
