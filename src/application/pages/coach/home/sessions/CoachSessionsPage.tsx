import styled from "styled-components"
import { StartedSessions } from "@/application/pages/coach/home/sessions/content/started/StartedSessions"
import { MediaRange } from "@/application/lib/responsive/media"
import { useEffect } from "react"
import { mounted } from "./coach-sessions-page.model"
import { TodaySessions } from "@/application/pages/coach/home/sessions/content/today/TodaySessions"
import { useStore } from "effector-react"
import { $hasTodaySessions } from "@/application/pages/coach/home/sessions/content/today/today-sessions.model"
import { $hasStartedSessions } from "@/application/pages/coach/home/sessions/content/started/started-sessions.model"

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

export const CoachSessionsPage = () => {
  const hasToday = useStore($hasTodaySessions)
  const hasStarted = useStore($hasStartedSessions)

  useEffect(() => {
    mounted()
  }, [])

  return (
    <Container>
      {hasStarted && <StartedSessions />}
      {hasToday && <TodaySessions />}
    </Container>
  )
}
