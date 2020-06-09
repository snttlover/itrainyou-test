import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { GirlWithClock } from "@/application/feature/coach-placeholder/right-images/GirlWithClock"
import React from "react"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import styled from "styled-components"

const Container = styled.div`
  background: #eceff1;
  width: 100vw;
  height: 100vh;
`

const features = ["Откликаться на заявку на сессию здесь и сейчас", "Находить клиентов для сессии здесь и сейчас"]

export const CoachNowPage = () => {
  return (
    <CoachDashboardLayout>
      <Container>
        <CoachSectionPlaceholder features={features} renderImage={() => <GirlWithClock />} />
      </Container>
    </CoachDashboardLayout>
  )
}
