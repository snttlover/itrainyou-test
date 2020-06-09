import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/application/feature/coach-placeholder/right-images/PhoneWithGirl"
import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import styled from "styled-components"

const Container = styled.div`
  background: #eceff1;
  width: 100vw;
  height: 100vh;
`

const features = ["Настраивать свое расписание", "Настраивать пакеты сессий", "Управлять доступностью профиля"]

export const CoachSchedulePage = () => {
  return (
    <CoachDashboardLayout>
      <Container>
        <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
      </Container>
    </CoachDashboardLayout>
  )
}
