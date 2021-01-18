import { Button } from "@/components/button/normal/Button"
import { CoachCard } from "@/components/coach-card/CoachCard"
import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { Loader, Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { SessionCard } from "@/pages/client/home/SessionCard"
import { useEvent, useStore } from "effector-react"
import InfiniteScroll from "react-infinite-scroll-component"
import {
  $activeSessions,
  $isHasMoreRecommendations,
  $recommendations,
  $todaySessions,
  loadActiveSessionsFx,
  loadMore,
  loadRecommendationsFx,
  loadTodaySessionsFx,
  mounted,
} from "./home.model"
import React, { useEffect } from "react"
import styled from "styled-components"
import { clientCall } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { Onboarding } from "@/pages/client/home/Onboarding"

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

export const HomePage = () => {
  const activeSessions = useStore($activeSessions)
  const todaySessions = useStore($todaySessions)
  const recommendations = useStore($recommendations)
  const isHasMoreRecommendations = useStore($isHasMoreRecommendations)
  const activeSessionsPending = useStore(loadActiveSessionsFx.pending)
  const todaySessionsPending = useStore(loadTodaySessionsFx.pending)
  const recomendationPending = useStore(loadRecommendationsFx.pending)
  const _mounted = useEvent(mounted)
  const _loadMore = useEvent(loadMore)

  useEffect(() => {
    _mounted()
  }, [])

  const startSession = useEvent(clientCall.methods.connectToSession)

  const startSessionClickHandler = (e: React.SyntheticEvent, sessionId: number) => {
    startSession(sessionId)
    e.preventDefault()
  }

  return (
    <ClientDashboardLayout>
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

      {todaySessions.length > 0 ? (
        <ContentContainer>
          <Block>
            <Title>Ближайшие сессии</Title>
            {todaySessions.map(session => (
              <TodaySessionCard session={session} key={session.id} />
            ))}
            {todaySessionsPending && <Loader />}
          </Block>
        </ContentContainer>

      ) : 
        todaySessionsPending ? 
          <Loader/> : <Onboarding/>}

      <ContentContainer>
        <Block>
          <Title>Рекомендации</Title>
          <InfiniteScroll
            loader={<Loader />}
            next={_loadMore as any}
            hasMore={isHasMoreRecommendations}
            dataLength={recommendations.length}
            style={{overflow: "hidden"}}
          >
            {recommendations.map(coach => (
              <RecommendationCoachCard key={coach.id} coach={coach} />
            ))}
          </InfiniteScroll>
        </Block>
      </ContentContainer>

    </ClientDashboardLayout>
  )
}

export default HomePage
