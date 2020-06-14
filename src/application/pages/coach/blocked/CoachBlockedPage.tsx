import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/application/feature/coach-placeholder/right-images/PhoneWithGirl"
import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const features = ["Смотреть список заблокированных клиентов", "Разблокировать клиентов"]

export const CoachBlockedPage = () => {
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachBlockedPage
