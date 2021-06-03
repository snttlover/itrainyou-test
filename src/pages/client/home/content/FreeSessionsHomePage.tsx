import { Button } from "@/oldcomponents/button/normal/Button"
import { CoachCard } from "@/oldcomponents/coach-card/CoachCard"
import { FreeSessionsContainer } from "@/oldcomponents/layouts/ContentContainer"
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
} from "../home.model"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { clientCall } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { CheckMediaDevices } from "@/oldcomponents/layouts/behaviors/dashboards/call/TestCall"
import { $allFreeSessionsStore } from "@/pages/search/coach-by-id/models/units"
import { HomeCalendar } from "@/pages/client/home/content/HomeCalendar"
import { Icon } from "@/oldcomponents/icon/Icon"

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 24px;

  ${MediaRange.lessThan("mobile")`
    margin: 16px;
  `}
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
  max-width: unset;

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

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 276px;
  margin-right: auto;

  ${MediaRange.lessThan("laptop")`
    display: none;
  `}
`

const CalendarTitle = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #424242;
  margin-bottom: 16px;
`

const TabletCalendarContainer = styled.div`
  background-color: white;
  display: none;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-bottom: 32px;

  ${MediaRange.lessThan("laptop")`
    display: flex;
  `}
`

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  height: 20px;
  width: 20px;
  fill: #424242;
  margin-left: auto;
`

const CalendarIcon = styled(Icon).attrs({ name: "calendar" })`
  height: 20px;
  width: 20px;
  margin-right: 24px;
  fill: ${props => props.theme.colors.primary};
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #5B6670;
`

const TabletPageContainer = styled.div`
  max-width: 576px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;

  ${MediaRange.lessThan("mobile")`
    align-items: center;
  `}
`

const ContentContainer = styled.div`
  max-width: 1060px;
  margin: 0 auto;
`

const GoBackIcon = styled(Icon).attrs({ name: "go-back" })`
  height: 20px;
  width: 20px;
  fill: ${props => props.theme.colors.primary};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.primary};
`


const TabletCalendar = ({ setShowed }: any) => {

  return (
    <TabletPageContainer>
      <Row onClick={() => setShowed(false)}>
        <GoBackIcon />
        <div>Назад</div>
      </Row>
      <CalendarTitle>Календарь всех бесплатных сессий</CalendarTitle>
      <HomeCalendar freeSessionsModule={$allFreeSessionsStore} />
    </TabletPageContainer>
  )
}


export const FreeSessionsHomePage = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [tabletCalendarShowed, setShowed] = useState(false)

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

      { tabletCalendarShowed ?
        <TabletCalendar setShowed={setShowed} />
        :
        <PageContainer>
          <FreeSessionsContainer>

            <CheckMediaDevices />

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

            <TabletCalendarContainer onClick={() => setShowed(true)}>
              <CalendarIcon />
              <Description>Календарь бесплатных сессий</Description>
              <Arrow />
            </TabletCalendarContainer>

            {
              !(upcomingSessionsPending || isFirstRender) &&
              <ContentContainer>
                <Block>
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
          <CalendarContainer>
            <CalendarTitle>Календарь всех бесплатных сессий</CalendarTitle>
            <HomeCalendar freeSessionsModule={$allFreeSessionsStore} />
          </CalendarContainer>
        </PageContainer>
      }

    </>
  )
}