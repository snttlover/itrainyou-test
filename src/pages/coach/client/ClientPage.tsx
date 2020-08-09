import { clientPageGate } from "@/pages/coach/client/client-page.model"
import { useGate } from "effector-react"
import React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"

export const ClientPage = () => {
  useGate(clientPageGate)

  return (
    <CoachDashboardLayout>
      <ContentContainer></ContentContainer>
    </CoachDashboardLayout>
  )
}
