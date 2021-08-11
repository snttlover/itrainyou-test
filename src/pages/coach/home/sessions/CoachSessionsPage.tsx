import styled from "styled-components"
import { StartedSessions } from "@/pages/coach/home/sessions/content/started/StartedSessions"
import { NewestParticipants } from "@/pages/coach/home/sessions/content/newest-participants/NewestParticipants"
import { MediaRange } from "@/lib/responsive/media"
import React, { useEffect, useState } from "react"
import { $coachSessionsPageLoading, $isCoachScheduleFilled, mounted } from "./coach-sessions-page.model"
import { useEvent, useStore } from "effector-react"
import { $hasStartedSessions } from "@/pages/coach/home/sessions/content/started/started-sessions.model"
import { Loader } from "@/old-components/spinner/Spinner"
import { $hasNewestParticipantsList } from "@/pages/coach/home/sessions/content/newest-participants/newest-participants.model"
import { EmptySessions } from "@/pages/coach/home/sessions/content/empty-sessions/EmptySessions"
import { FillOutSchedule } from "@/pages/coach/home/sessions/content/empty-sessions/FillOutSchedule"
import { ContentContainer } from "@/old-components/layouts/ContentContainer"
import { FilledOutNoResponses } from "@/pages/coach/home/sessions/content/empty-sessions/FilledOutNoResponses"
import { CheckMediaDevices } from "@/old-components/layouts/behaviors/dashboards/call/TestCall"

const Container = styled.div<{ nosessions: boolean }>`
  width: 100%;
  max-width: ${({ nosessions }) => (nosessions ? "" : "672px")};

  ${MediaRange.lessThan("tablet")`
    margin: 0 auto;
  `}
`

const useSessions = () => {
  const hasStarted = useStore($hasStartedSessions)
  const hasNewest = useStore($hasNewestParticipantsList)
  const isFilledSchedule = useStore($isCoachScheduleFilled)
  const noHasSessions = !hasStarted && !hasNewest
  const isFilledScheduleNoHasSessions = noHasSessions && isFilledSchedule
  const EmptySessionsWith = () => {
    return (
      <>
        {!isFilledSchedule && <FillOutSchedule />}
        {isFilledScheduleNoHasSessions && <FilledOutNoResponses />}

        <ContentContainer>
          <EmptySessions />
        </ContentContainer>
      </>
    )
  }
  return {
    MainSessions: () => (
      <>
        {hasStarted && <StartedSessions />}
        {hasNewest && <NewestParticipants />}
      </>
    ),
    Onbordings: () => <>{noHasSessions && <EmptySessionsWith />}</>,
  }
}

export const CoachSessionsPage = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const pageLoading = useStore($coachSessionsPageLoading)
  const _mounted = useEvent(mounted)

  const hasStarted = useStore($hasStartedSessions)
  const hasNewest = useStore($hasNewestParticipantsList)
  const noHasSessions = !hasStarted && !hasNewest

  const { MainSessions, Onbordings } = useSessions()

  const showComponentOrLoader = (Component: React.FC) => (pageLoading || isFirstRender ? <Loader /> : <Component />)

  useEffect(() => {
    _mounted()
    setIsFirstRender(false)
  }, [])

  return (
    <>
      <ContentContainer>
        <CheckMediaDevices type={"coach"} />
      </ContentContainer>

      {/*{showComponentOrLoader(Onbordings)}*/}
      {!(pageLoading || isFirstRender) && <Onbordings />}
      <ContentContainer>
        <Container nosessions={noHasSessions}>{showComponentOrLoader(MainSessions)}</Container>
      </ContentContainer>
    </>
  )
}
