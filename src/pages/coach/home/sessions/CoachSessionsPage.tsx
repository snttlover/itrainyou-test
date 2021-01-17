import styled from "styled-components"
import { StartedSessions } from "@/pages/coach/home/sessions/content/started/StartedSessions"
import { NewestParticipants } from "@/pages/coach/home/sessions/content/newest-participants/NewestParticipants"
import { MediaRange } from "@/lib/responsive/media"
import React, { useEffect } from "react"
import { $coachSessionsPageLoading, mounted } from "./coach-sessions-page.model"
import { TodaySessions } from "@/pages/coach/home/sessions/content/today/TodaySessions"
import { useEvent, useStore } from "effector-react"
import { $hasTodaySessions } from "@/pages/coach/home/sessions/content/today/today-sessions.model"
import { $hasStartedSessions } from "@/pages/coach/home/sessions/content/started/started-sessions.model"
import { Loader } from "@/components/spinner/Spinner"
import { $hasNewestParticipantsList } from "@/pages/coach/home/sessions/content/newest-participants/newest-participants.model"
import { EmptySessions } from "@/pages/coach/home/sessions/content/empty-sessions/EmptySessions"
import { FillOutSchedule } from "@/pages/coach/home/sessions/content/empty-sessions/FillOutSchedule"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { FilledOutNoResponses } from "@/pages/coach/home/sessions/content/empty-sessions/FilledOutNoResponses"
import { $coachStore } from "@/pages/coach/home/sessions/content/empty-sessions/empty-sessions.model"

const Container = styled.div<{ nosessions: boolean }>`
  width: 100%;
  max-width: ${({nosessions}) => nosessions ? "" : "672px"}; 
  margin-top: 36px;
    
  ${MediaRange.lessThan("tablet")`
    margin: 0 auto;
    margin-top: 40px;
  `}

  ${MediaRange.greaterThan("tablet")`
    // padding: 0 16px;
  `}
`

const Sessions = () => {

  const hasToday = useStore($hasTodaySessions)
  const hasStarted = useStore($hasStartedSessions)
  const hasNewest = useStore($hasNewestParticipantsList)
  const isFilledSchedule = useStore($coachStore)
  const noHasSessions = !hasToday && !hasStarted && !hasNewest
  const isFilledScheduleNoHasSessions = noHasSessions && !isFilledSchedule

  const EmptySessionsWith = () => {
    return (
      <>
        {isFilledSchedule && <FillOutSchedule/>}
        {isFilledScheduleNoHasSessions && <FilledOutNoResponses/>}
        <ContentContainer>
          <EmptySessions/>
        </ContentContainer>
      </>
    )
  }

  return (
    <>
      {noHasSessions && <EmptySessionsWith />}
      {hasStarted && <StartedSessions />}
      {hasToday && <TodaySessions />}
      {hasNewest && <NewestParticipants />}
    </>
  )
}

export const CoachSessionsPage = () => {
  const pageLoading = useStore($coachSessionsPageLoading)
  const _mounted = useEvent(mounted)

  const hasToday = useStore($hasTodaySessions)
  const hasStarted = useStore($hasStartedSessions)
  const hasNewest = useStore($hasNewestParticipantsList)
  const noHasSessions = !hasToday && !hasStarted && !hasNewest

  useEffect(() => {
    _mounted()
  }, [])

  return <Container nosessions={noHasSessions}>{pageLoading ? <Loader /> : <Sessions />}</Container>
}
