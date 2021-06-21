import { Button } from "@/oldcomponents/button/normal/Button"
import { CoachCard } from "@/oldcomponents/coach-card/CoachCard"
import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
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
  homePageMounted,
  $informerShowed
} from "../home.model"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { clientCall } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { Onboarding } from "@/pages/client/home/content/Onboarding"
import { CheckMediaDevices } from "@/oldcomponents/layouts/behaviors/dashboards/call/TestCall"
import { Icon } from "@/oldcomponents/icon/Icon"

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
  margin-top: 28px;
  white-space: nowrap;

  ${MediaRange.greaterThan("mobile")`
    display: none;
  `}
`

const InformerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 22px;
  background: linear-gradient(91.34deg, #0A58CC -38.45%, #9E58CC 128.49%), linear-gradient(90deg, #4858CC -50%, #783D9D 150%), #FFFFFF;
  border-radius: 8px;
  margin-top: 24px;
  max-width: 600px;
`

const GiftIcon = styled(Icon).attrs({ name: "gift" })`
  width: 24px;
  cursor: pointer;
  fill: white;
`

const InformerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 22px;
  max-width: 90%;
  
  ${MediaRange.lessThan("mobile")`
    padding: 0 16px;
    max-width: 85%;
  `}
`

const InformerHeader = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
`

const InformerDescription = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
`

const Close = styled(Icon).attrs({ name: "plus" })`
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: white;
  transform: rotate(45deg);
  margin-left: auto;
`

const SocialLink = styled.a`
  text-decoration: underline;
  color: #FFFFFF;
  font-weight: 500;
  margin-right: 2px;
`

const Informer = () => {
  const [showed, setShowed] = useState(true)

  const handleOnCrossClick = () => {
    setShowed(false)
    localStorage.setItem("show_informer", "not_show")
  }

  return (
    <>
      {showed ?
        <InformerContainer>
          <GiftIcon />
          <InformerTextContainer>
            <InformerHeader>Вы отправили запрос на бронирование бесплатной сессии!</InformerHeader>
            <InformerDescription>А пока ознакомьтесь с другими коучами нашей платформы и присоединитесь к нам в социальных сетях:&nbsp;
              <SocialLink href='https://instagram.com/i_trainyou'>Instagram,</SocialLink>
              <SocialLink href='https://www.facebook.com/iTrainYou-107404141044566/'>Facebook</SocialLink>
            </InformerDescription>
          </InformerTextContainer>
          <Close onClick={handleOnCrossClick} />
        </InformerContainer>
        : null}
    </>
  )
}

export const StandardHomePage = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const activeSessions = useStore($activeSessions)
  const upcomingSessions = useStore($upcomingSessions)
  const recommendations = useStore($recommendations)
  const isHasMoreRecommendations = useStore($isHasMoreRecommendations)
  const activeSessionsPending = useStore(loadActiveSessionsFx.pending)
  const upcomingSessionsPending = useStore(loadUpcomingSessionsFx.pending)
  const recommendationPending = useStore(loadRecommendationsFx.pending)
  const _mounted = useEvent(homePageMounted)
  const _loadMore = useEvent(loadMore)
  const informerVisibility = useStore($informerShowed)

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
      <ContentContainer>
        <CheckMediaDevices type={"client"} />
        {informerVisibility && (<Informer />)}
      </ContentContainer>

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
            <Title>Ближайшие сессии</Title>
            {upcomingSessions.map(session => (
              <TodaySessionCard session={session} key={session.id} />
            ))}
          </Block>
        </ContentContainer>

      ) :
        (upcomingSessionsPending || isFirstRender)?
          <Loader/> : <Onboarding/>}

      {
        !(upcomingSessionsPending || isFirstRender) &&
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
      }

    </>
  )
}