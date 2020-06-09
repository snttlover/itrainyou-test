import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/application/feature/coach-placeholder/right-images/PhoneWithGirl"
import styled from "styled-components"

const Container = styled.div`
  background: #eceff1;
  width: 100vw;
  height: 100vh;
`

const features = ["Смотреть список своих клиентов", "Искать по своим клиентам", "Переходить к диалогу с клиентом"]

export const CoachClientsPage = () => {
  return (
    <CoachDashboardLayout>
      <Container>
        <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
      </Container>
    </CoachDashboardLayout>
  )
}
