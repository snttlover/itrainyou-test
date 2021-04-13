import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import * as React from "react"
import { CoachDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const features = ["Просматривать свои сессии и групповые сессии на календаре"]

export const CoachCalendarPage = () => {
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachCalendarPage
