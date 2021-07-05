import { ContentContainer } from "@/old-components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { GirlWithClock } from "@/feature/coach-placeholder/right-images/GirlWithClock"
import * as React from "react"
import { CoachDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

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
