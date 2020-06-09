import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PeopleOnTheClouds } from "@/application/feature/coach-placeholder/right-images/PeopleOnTheClouds"
import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import styled from "styled-components"

const Container = styled.div`
  background: #eceff1;
  width: 100vw;
  height: 100vh;
`

const features = [
  "Создавать групповые сессии и их шаблоны",
  "Просматривать и редактировать свои групповые сессии",
  "Добавлять материалы для групповых сессий",
]

export const CoachGroupSessionsPage = () => {
  return (
    <CoachDashboardLayout>
      <Container>
        <CoachSectionPlaceholder features={features} renderImage={() => <PeopleOnTheClouds />} />
      </Container>
    </CoachDashboardLayout>
  )
}

export default CoachGroupSessionsPage
