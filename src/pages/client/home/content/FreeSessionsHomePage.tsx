import { Button } from "@/old-components/button/normal/Button"
import { CoachCard } from "@/old-components/coach-card/CoachCard"
import { FreeSessionsContainer } from "@/old-components/layouts/ContentContainer"
import { Loader } from "@/old-components/spinner/Spinner"
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
  loadUpcomingSessionsFx,
  freeSessionsPageMounted,
} from "../home.model"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { CheckMediaDevices } from "@/old-components/layouts/behaviors/dashboards/call/TestCall"
import { $allFreeSessionsStore } from "@/pages/search/coach-by-id/models/units"
import { HomeCalendar } from "@/pages/client/home/content/HomeCalendar"
import { Icon } from "@/old-components/icon/Icon"
import { Informer } from "@/new-components/informer/Informer"
import { useSplittedStore } from "@/lib/effector/use-split-store"
import { date } from "@/lib/formatting/date"

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
  margin-top: 24px;

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
  color: #5b6670;
`

const TabletPageContainer = styled.div`
  max-width: 576px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;

  ${MediaRange.lessThan("mobile")`
    align-items: center;
    max-width: 288px;
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
  margin-top: 24px;
  align-self: flex-start;
  margin-bottom: 24px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.primary};

  ${MediaRange.lessThan("mobile")`
    margin-top: 16px;
  `}
`

const InformerContainer = styled.div`
  margin-top: 24px;
`

const InformerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const InformerHeader = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  margin-bottom: 8px;
`

const InformerDescription = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
`

const TabletCalendar = ({ setShowed }: any) => {
  return (
    <TabletPageContainer>
      <Row onClick={() => setShowed(false)}>
        <GoBackIcon />
        <div>Назад</div>
      </Row>
      <CalendarTitle>Выберите удобное время</CalendarTitle>
      <HomeCalendar freeSessionsModule={$allFreeSessionsStore} />
    </TabletPageContainer>
  )
}

export const FreeSessionsHomePage = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [tabletCalendarShowed, setShowed] = useState(false)

  const activeSessions = useStore($activeSessions)
  const recommendations = useStore($recommendations)
  const isHasMoreRecommendations = useStore($isHasMoreRecommendations)
  const activeSessionsPending = useStore(loadActiveSessionsFx.pending)
  const upcomingSessionsPending = useStore(loadUpcomingSessionsFx.pending)
  const _mounted = useEvent(freeSessionsPageMounted)
  const _loadMore = useEvent(loadMore)

  const upcomingSessions = useSplittedStore({
    store: $upcomingSessions,
    splitter: session =>
      date().isSame(session.startDatetime, "d") ? "Сегодня" : date(session.startDatetime).format("DD MMMM"),
  })

  useEffect(() => {
    _mounted()
    setIsFirstRender(false)
  }, [])

  return (
    <>
      {tabletCalendarShowed ? (
        <TabletCalendar setShowed={setShowed} />
      ) : (
        <PageContainer>
          <FreeSessionsContainer>
            <CheckMediaDevices type={"client"} />

            <ContentContainer>
              {activeSessions.length > 0 && (
                <Block>
                  <Title>Сессия началась</Title>
                  {activeSessions.map(session => (
                    <ActiveSessionCard
                      id={session.id}
                      aboutLink={`/client/sessions/${session.id}`}
                      avatar={session.coach.avatar}
                      name={`${session.coach.firstName} ${session.coach.lastName}`}
                      startDatetime={session.startDatetime}
                      endDatetime={session.endDatetime}
                      key={session.id}
                      inProgress
                    />
                  ))}
                  {activeSessionsPending && <Loader />}
                </Block>
              )}
            </ContentContainer>

            {upcomingSessions.items.length ? (
              <ContentContainer>
                <Block>
                  {upcomingSessions.keys.map(day => {
                    return (
                      <div key={day}>
                        <Title>{day}</Title>
                        {upcomingSessions.splitted(day).map(session => (
                          <TodaySessionCard
                            id={session.id}
                            aboutLink={`/client/sessions/${session.id}`}
                            avatar={session.coach.avatar}
                            name={`${session.coach.firstName} ${session.coach.lastName}`}
                            startDatetime={session.startDatetime}
                            endDatetime={session.endDatetime}
                            key={session.id}
                          />
                        ))}
                      </div>
                    )
                  })}
                </Block>
              </ContentContainer>
            ) : null}

            <TabletCalendarContainer onClick={() => setShowed(true)}>
              <CalendarIcon />
              <Description>Выберите удобное время</Description>
              <Arrow />
            </TabletCalendarContainer>

            {!(upcomingSessionsPending || isFirstRender) && (
              <ContentContainer>
                <InformerContainer>
                  <Informer crossColored iconName={"gift"} closable backGround={"blue"}>
                    <InformerTextContainer>
                      <InformerHeader>Мы подобрали для вас подходящих коучей!</InformerHeader>
                      <InformerDescription>
                        {/* TODO надо посмотреть точный текст (про 30 минут) в дизе */}
                        Забронируйте приветственную сессию на 30 минут бесплатно, чтобы сформировать запрос и
                        познакомиться со специалистом. Выберите удобную дату и время или конкретного коуча.
                      </InformerDescription>
                    </InformerTextContainer>
                  </Informer>
                </InformerContainer>

                <Block>
                  <Title>Подобранные коучи</Title>
                  <InfiniteScroll
                    loader={<Loader />}
                    next={_loadMore as any}
                    hasMore={isHasMoreRecommendations}
                    dataLength={recommendations.length}
                    style={{ overflow: "hidden" }}
                  >
                    {recommendations.map(coach => (
                      <RecommendationCoachCard key={coach.id} coach={coach} freeSessions />
                    ))}
                  </InfiniteScroll>
                </Block>
              </ContentContainer>
            )}
          </FreeSessionsContainer>
          <CalendarContainer>
            <CalendarTitle>Выберите удобное время</CalendarTitle>
            <HomeCalendar freeSessionsModule={$allFreeSessionsStore} />
          </CalendarContainer>
        </PageContainer>
      )}
    </>
  )
}
