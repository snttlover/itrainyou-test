import styled from "styled-components"
import { StartedSessions } from "@/application/pages/coach/home/sessions/content/started/StartedSessions"
import {NewestParticipants} from "@/application/pages/coach/home/sessions/content/newest-participants/NewestParticipants"
import { MediaRange } from "@/application/lib/responsive/media"
import { useEffect } from "react"
import { $coachSessionsPageLoading, mounted } from "./coach-sessions-page.model"
import { TodaySessions } from "@/application/pages/coach/home/sessions/content/today/TodaySessions"
import { useStore } from "effector-react"
import { $hasTodaySessions } from "@/application/pages/coach/home/sessions/content/today/today-sessions.model"
import { $hasStartedSessions } from "@/application/pages/coach/home/sessions/content/started/started-sessions.model"
import { Loader } from "@/application/components/spinner/Spinner"

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

const Sessions = () => {
  const hasToday = useStore($hasTodaySessions)
  const hasStarted = useStore($hasStartedSessions)

  return (
    <>
      {hasStarted && <StartedSessions />}
      {hasToday && <TodaySessions />}
      <NewestParticipants />
    </>
  )
}

export const CoachSessionsPage = () => {
  const pageLoading = useStore($coachSessionsPageLoading)

  useEffect(() => {
    mounted()
  }, [])

  return (
    <Container>
      {pageLoading ? <Loader /> : <Sessions />}
    </Container>
  )
}
