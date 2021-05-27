import { Button } from "@/oldcomponents/button/normal/Button"
import { CoachCard } from "@/oldcomponents/coach-card/CoachCard"
import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer, FreeSessionsContainer } from "@/oldcomponents/layouts/ContentContainer"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { SessionCard } from "@/pages/client/home/SessionCard"
import { useEvent, useStore } from "effector-react"
import InfiniteScroll from "react-infinite-scroll-component"
import {
  $activeSessions,
  $isHasMoreRecommendations,
  $recommendations,
  $upcomingSessions,
  loadActiveSessionsFx,
  loadMore,
  loadRecommendationsFx,
  loadUpcomingSessionsFx,
  freeSessionsPageMounted,
} from "./home.model"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { clientCall } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { Onboarding } from "@/pages/client/home/Onboarding"
import { CheckMediaDevices } from "@/oldcomponents/layouts/behaviors/dashboards/call/TestCall"
import { Calendar } from "@/oldcomponents/calendar/Calendar"
import { CoachDatepicker } from "@/pages/search/content/list/content/CoachDatepicker"
import { $allFreeSessionsStore, $coach, $sessionsPickerStore } from "@/pages/search/coach-by-id/models/units"
import { HomeCalendar } from "@/pages/client/home/content/HomeCalendar"

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Block = styled.div`
  position: relative;
  max-width: 600px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-top: 24px;
`

const ActiveSessionCard = styled(SessionCard)`
  margin-top: 12px;
`

const TodaySessionCard = styled(SessionCard)`
  margin-top: 12px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 24px;
  `}
`

const RecommendationCoachCard = styled(CoachCard)`
  margin-top: 12px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 24px;
  `}
`

const SessionEnterButton = styled(Button)`
  display: none;
  margin-top: auto;
  ${MediaRange.greaterThan("mobile")`
    display: block;
  `}
`

const SessionEnterText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #4858cc;
  margin-top: auto;
  white-space: nowrap;

  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`

const Datepicker = () => {
  const coach = useStore($coach)

  if (coach) {
    return <HomeCalendar sessionsList={$allFreeSessionsStore} />
  }
  return null
}

export const FreeSessionsHomePage = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const activeSessions = useStore($activeSessions)
  const upcomingSessions = useStore($upcomingSessions)
  const recommendations = useStore($recommendations)
  const isHasMoreRecommendations = useStore($isHasMoreRecommendations)
  const activeSessionsPending = useStore(loadActiveSessionsFx.pending)
  const upcomingSessionsPending = useStore(loadUpcomingSessionsFx.pending)
  const recommendationPending = useStore(loadRecommendationsFx.pending)
  const _mounted = useEvent(freeSessionsPageMounted)
  const _loadMore = useEvent(loadMore)

  useEffect(() => {
    _mounted()
    setIsFirstRender(false)
  }, [])

  const startSession = useEvent(clientCall.methods.connectToSession)

  const startSessionClickHandler = (e: React.SyntheticEvent, sessionId: number) => {
    startSession(sessionId)
    e.preventDefault()
  }

  return (
    <>
      <PageContainer>
        <FreeSessionsContainer>

          <ContentContainer>
            {activeSessions.length > 0 &&(
              <Block>
                <Title>Сессия уже началась!</Title>
                {activeSessions.map(session => (
                  <ActiveSessionCard session={session} key={session.id}>
                    <div onClick={(e) => startSessionClickHandler(e, session.id)}>
                      <SessionEnterButton data-slim>Зайти в сессию</SessionEnterButton>
                      <SessionEnterText>Зайти в сессию</SessionEnterText>
                    </div>
                  </ActiveSessionCard>
                ))}
                {activeSessionsPending && <Loader />}
              </Block>
            )}
          </ContentContainer>

          {upcomingSessions.length ? (
            <ContentContainer>
              <Block>
                <CheckMediaDevices />
                <Title>Ближайшие сессии</Title>
                {upcomingSessions.map(session => (
                  <TodaySessionCard session={session} key={session.id} />
                ))}
              </Block>
            </ContentContainer>

          ) : null}

          {
            !(upcomingSessionsPending || isFirstRender) &&
              <ContentContainer>
                <Block>
                  <CheckMediaDevices />
                  <Title>Подобранные коучи</Title>
                  <InfiniteScroll
                    loader={<Loader />}
                    next={_loadMore as any}
                    hasMore={isHasMoreRecommendations}
                    dataLength={recommendations.length}
                    style={{overflow: "hidden"}}
                  >
                    {recommendations.map(coach => (
                      <RecommendationCoachCard key={coach.id} coach={coach} freeSessions />
                    ))}
                  </InfiniteScroll>
                </Block>
              </ContentContainer>
          }

        </FreeSessionsContainer>
        {/*Calendar*/}
        {/*<Datepicker />*/}
        <div>Календарь всех бесплатных сессий</div>
        <HomeCalendar sessionsList={$allFreeSessionsStore} />
      </PageContainer>

    </>
  )
}