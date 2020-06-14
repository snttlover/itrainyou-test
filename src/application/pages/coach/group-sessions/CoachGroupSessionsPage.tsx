import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PeopleOnTheClouds } from "@/application/feature/coach-placeholder/right-images/PeopleOnTheClouds"
import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

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
