import { ContentContainer } from "#/components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "#/feature/coach-placeholder/CoachSectionPlaceholder"
import { PeopleOnTheClouds } from "#/feature/coach-placeholder/right-images/PeopleOnTheClouds"
import * as React from "react"
import { CoachDashboardLayout } from "#/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

const features = [
  "Создавать групповые сессии и их шаблоны",
  "Просматривать и редактировать свои групповые сессии",
  "Добавлять материалы для групповых сессий",
]

export const CoachGroupSessionsPage = () => {
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        <CoachSectionPlaceholder features={features} renderImage={() => <PeopleOnTheClouds />} />
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachGroupSessionsPage
