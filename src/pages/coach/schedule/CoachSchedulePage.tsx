import { CoachDashboardLayout } from "#/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { $coachAccess } from "#/feature/user/user.model"
import { CoachSchedulePlaceholder } from "#/pages/coach/schedule/CoachSchedulePlaceholder"
import { useStore } from "effector-react/ssr"
import * as React from "react"
import { ContentContainer } from "#/components/layouts/ContentContainer"
import styled from "styled-components"
import { Schedule } from "./Schedule"

const Container = styled(ContentContainer)`
  margin-top: 16px;
`

export const CoachSchedulePage = () => {
  const coachAccess = useStore($coachAccess)
  return (
    <CoachDashboardLayout>
      <Container>{coachAccess.isApproved ? <Schedule /> : <CoachSchedulePlaceholder />}</Container>
    </CoachDashboardLayout>
  )
}

export default CoachSchedulePage
