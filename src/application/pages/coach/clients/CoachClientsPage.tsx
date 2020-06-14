import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/application/feature/coach-placeholder/right-images/PhoneWithGirl"

const features = ["Смотреть список своих клиентов", "Искать по своим клиентам", "Переходить к диалогу с клиентом"]

export const CoachClientsPage = () => {
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachClientsPage
