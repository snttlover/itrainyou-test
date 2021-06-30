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
  loadUpcomingSessionsFx,
  homePageMounted,
  $informerShowed,
  $freeSessionsStatus,
  STORAGE_KEY
} from "../home.model"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { clientCall } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { Onboarding } from "@/pages/client/home/content/Onboarding"
import { CheckMediaDevices } from "@/oldcomponents/layouts/behaviors/dashboards/call/TestCall"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Informer } from "@/newcomponents/informer/Informer"

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
  margin-top: 24px;
  max-width: 600px;
`

const FacebookIcon = styled(Icon).attrs({ name: "fb" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  fill: #4858CC;
  margin-right: 12px;
`

const InstagramIcon = styled(Icon).attrs({ name: "instagram" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  fill: #4858CC;
  margin-right: 12px;
`

const InformerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const InformerHeader = styled.div<{changeColors: boolean}>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 8px;
  color: ${({ changeColors }) => changeColors ? "#424242" : "#FFFFFF"};
`

const InformerDescription = styled.div<{changeColors: boolean}>`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${({ changeColors }) => changeColors ? "#424242" : "#FFFFFF"};
`

const SocialLink = styled.a<{filledColor?: boolean}>`
  text-decoration: underline;
  color: ${({ filledColor }) => !!filledColor ? "#FFFFFF" : "#4858CC"};
  font-weight: 500;

  &:last-child {
    margin-left: 20px;
  }
`

const SocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`

const StyledInformer = () => {
  const freeSessionsStatus = useStore($freeSessionsStatus)

  const handleOnCrossClick = () => {
    localStorage.setItem(STORAGE_KEY, "not_show")
  }

  let header = ""
  let description = "А пока ознакомьтесь с другими коучами нашей платформы и присоединитесь к нам в социальных сетях:"
  let showSocials = false

  const ContentOption = ({ changeColors }: any) => (
    <InformerTextContainer>
      <InformerHeader changeColors>{header}</InformerHeader>

      <InformerDescription changeColors>{description}</InformerDescription>
      {showSocials ?
        <SocialsContainer>
          <SocialLink href='https://instagram.com/i_trainyou'><InstagramIcon />Instagram</SocialLink>
          <SocialLink href='https://www.facebook.com/iTrainYou-107404141044566/'><FacebookIcon />Facebook</SocialLink>
        </SocialsContainer>
        : null}
    </InformerTextContainer>
  )

  switch (freeSessionsStatus) {
  case "AWAITING_BOOK_PROMO_REQUEST":
    header = "Вы отправили запрос на бронирование бесплатной сессии!"
    description = "За 30 минут вы сможете познакомиться с коучем, определить, над чем хотите работать и наметить дальнейшний план действий."
    showSocials = false

    return (
      <InformerContainer>
        <Informer
          iconName={"gift-black"}
          closable
          backGround={"no"}
          onCrossClick={handleOnCrossClick} >
          <ContentOption changeColors={true}/>
        </Informer>
      </InformerContainer>
    )

  case "ACTIVE_PROMO_SESSION":
    header = "Бесплатная сессия забронирована!"
    description = "Надеемся, что все пройдет успешно! Приветственная сессия создана для знакомства с коучем и формирования вашего запроса."
    showSocials = false

    return (
      <InformerContainer>
        <Informer
          iconName={"gift-black"}
          closable
          backGround={"no"}
          onCrossClick={handleOnCrossClick} >
          <ContentOption changeColors={true}/>
        </Informer>
      </InformerContainer>
    )

  case "AWAITING_COMPLETION_PROMO_REQUEST":
    header = "Вы не подтвердили окончание бесплатной сессии!"
    description = "Нам важно получить обратную связь о прошедшей сессии, чтобы совершенствоваться."
    showSocials = false

    return (
      <InformerContainer>
        <Informer
          iconName={"gift-black"}
          closable
          backGround={"no"}
          onCrossClick={handleOnCrossClick} >
          <ContentOption changeColors={true}/>
        </Informer>
      </InformerContainer>
    )

  case "PROMO_LIMIT_ENDED":
    header = "Вы исчерпали лимит бесплатных сессий на платформе."
    description = "Предлагаем забронировать первую сессию и начать свой путь к цели!"
    showSocials = false

    return (
      <InformerContainer>
        <Informer
          closable
          backGround={"no"}
          onCrossClick={handleOnCrossClick} >
          <ContentOption changeColors={true}/>
        </Informer>
      </InformerContainer>
    )

  case "NO_PROMO_AVAILABLE":
    return null

  default:
    return null
  }
}

export const StandardHomePage = () => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const activeSessions = useStore($activeSessions)
  const upcomingSessions = useStore($upcomingSessions)
  const recommendations = useStore($recommendations)
  const isHasMoreRecommendations = useStore($isHasMoreRecommendations)
  const activeSessionsPending = useStore(loadActiveSessionsFx.pending)
  const upcomingSessionsPending = useStore(loadUpcomingSessionsFx.pending)
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
        {informerVisibility && (<StyledInformer />)}
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