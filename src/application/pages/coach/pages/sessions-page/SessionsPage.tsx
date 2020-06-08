import styled from "styled-components"
import { StartedSessions } from "@/application/pages/coach/pages/sessions-page/content/StartedSessions"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  max-width: 672px;
  margin-top: 36px;
  margin-left: 40px;
  padding: 0 16px;
  ${MediaRange.lessThan(`tablet`)`
    margin: 0 auto;
    margin-top: 40px;
  `}
`

export default () => (
  <CoachDashboardLayout>
    <Container>
      <StartedSessions />
      <StartedSessions />
      <StartedSessions />
    </Container>
  </CoachDashboardLayout>
)
