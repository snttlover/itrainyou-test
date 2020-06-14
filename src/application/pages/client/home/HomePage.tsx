import { Button } from "@/application/components/button/normal/Button"
import { CoachCard } from "@/application/components/coach-card/CoachCard"
import { ClientDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import { Loader, Spinner } from "@/application/components/spinner/Spinner"
import { MediaRange } from "@/application/lib/responsive/media"
import { SessionCard } from "@/application/pages/client/home/SessionCard"
import { useStore } from "effector-react"
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

  useEffect(() => {
    mounted()
  }, [])

  return (
    <ClientDashboardLayout>
      <ContentContainer>
        {activeSessions.length > 0 && (
          <Block>
            <Title>Сессия уже началась!</Title>
            {activeSessions.map(session => (
              <ActiveSessionCard session={session} key={session.id}>
                <SessionEnterButton slim>Зайти в сессию</SessionEnterButton>
                <SessionEnterText>Зайти в сессию</SessionEnterText>
              </ActiveSessionCard>
            ))}
            {activeSessionsPending && <Loader />}
          </Block>
        )}
        {todaySessions.length > 0 && (
          <Block>
            <Title>У вас сегодня</Title>
            {todaySessions.map(session => (
              <TodaySessionCard session={session} key={session.id}>
                <SessionEnterButton slim>Зайти в сессию</SessionEnterButton>
                <SessionEnterText>Зайти в сессию</SessionEnterText>
              </TodaySessionCard>
            ))}
            {todaySessionsPending && <Loader />}
          </Block>
        )}
        <Block>
          <Title>Рекомендации</Title>
          <InfiniteScroll
            loader={<Loader />}
            next={loadMore as any}
            hasMore={isHasMoreRecommendations}
            dataLength={recommendations.length}
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
