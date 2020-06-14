import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { GirlWithClock } from "@/application/feature/coach-placeholder/right-images/GirlWithClock"
import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const features = ["Откликаться на заявку на сессию здесь и сейчас", "Находить клиентов для сессии здесь и сейчас"]

export const CoachNowPage = () => {
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        <CoachSectionPlaceholder features={features} renderImage={() => <GirlWithClock />} />
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachNowPage
