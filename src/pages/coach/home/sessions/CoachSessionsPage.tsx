import styled from "styled-components"
import { StartedSessions } from "@/pages/coach/home/sessions/content/started/StartedSessions"
import { NewestParticipants } from "@/pages/coach/home/sessions/content/newest-participants/NewestParticipants"
import { MediaRange } from "@/lib/responsive/media"
import React, { useEffect, useState } from "react"
import {
  $coachSessionsPageLoading,
  $isCoachScheduleFilled,
  mounted
} from "./coach-sessions-page.model"
import { TodaySessions } from "@/pages/coach/home/sessions/content/today/TodaySessions"
import { useEvent, useStore } from "effector-react"
import { $hasTodaySessions } from "@/pages/coach/home/sessions/content/today/today-sessions.model"
import { $hasStartedSessions } from "@/pages/coach/home/sessions/content/started/started-sessions.model"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import { $hasNewestParticipantsList } from "@/pages/coach/home/sessions/content/newest-participants/newest-participants.model"
import { EmptySessions } from "@/pages/coach/home/sessions/content/empty-sessions/EmptySessions"
import { FillOutSchedule } from "@/pages/coach/home/sessions/content/empty-sessions/FillOutSchedule"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import { FilledOutNoResponses } from "@/pages/coach/home/sessions/content/empty-sessions/FilledOutNoResponses"
import { TestCallModal } from "@/oldcomponents/layouts/behaviors/dashboards/call/TestCall"
import { changeCallModal } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"

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

const CheckMediaDevices = () => {

  const showModal = useEvent(changeCallModal)

  return (
          <>
          <TestCallModal />
          <div onClick={() => showModal(true)}>Проверьте камеру и микрофон до встречи с клиентом</div>
            </>
  )
}

const useSessions = () => {
  const hasToday = useStore($hasTodaySessions)
  const hasStarted = useStore($hasStartedSessions)
  const hasNewest = useStore($hasNewestParticipantsList)
  const isFilledSchedule = useStore($isCoachScheduleFilled)
  const noHasSessions = !hasToday && !hasStarted && !hasNewest
  const isFilledScheduleNoHasSessions = noHasSessions && isFilledSchedule
  const EmptySessionsWith = () => {
    return (
      <>
        {!isFilledSchedule && <FillOutSchedule/>}
        {isFilledScheduleNoHasSessions && <FilledOutNoResponses/>}

        <ContentContainer>
          <EmptySessions/>
        </ContentContainer>
      </>
    )
  }
  return {
    MainSessions: () => (
      <>
        {hasStarted && <StartedSessions />}
        {hasToday && <TodaySessions />}
        {hasNewest && <NewestParticipants />}
      </>
    ),
    Onbordings: () => (
      <>
        {noHasSessions && <EmptySessionsWith />}
      </>
    )
  }
}

export const CoachSessionsPage = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const pageLoading = useStore($coachSessionsPageLoading)
  const _mounted = useEvent(mounted)

  const hasToday = useStore($hasTodaySessions)
  const hasStarted = useStore($hasStartedSessions)
  const hasNewest = useStore($hasNewestParticipantsList)
  const noHasSessions = !hasToday && !hasStarted && !hasNewest

  const {MainSessions, Onbordings} = useSessions()

  const showComponentOrLoader = (Component: React.FC) => (pageLoading || isFirstRender) ? <Loader/> : <Component/>

  useEffect(() => {
    _mounted()
    setIsFirstRender(false)
  }, [])

  return (
    <>
      {/*{showComponentOrLoader(Onbordings)}*/}
      {!(pageLoading || isFirstRender) && <Onbordings/>}
      <ContentContainer>
        <CheckMediaDevices />
        <Container nosessions={noHasSessions}>
          {showComponentOrLoader(MainSessions)}
        </Container>
      </ContentContainer>
    </>
  )
}
