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

const features = ["Начать онлайн чат с агентом поддержки", "Решить возникшую проблему или уточнить интересующий вопрос"]

export const CoachSupportPage = () => {
  return (
    <CoachDashboardLayout>
      <Container>
        <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
      </Container>
    </CoachDashboardLayout>
  )
}

export default CoachSupportPage
