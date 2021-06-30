import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import { ServerParams, START } from "@/lib/effector"
import { MediaRange } from "@/lib/responsive/media"
import { AboutCoach } from "@/pages/search/coach-by-id/components/AboutCoach"
import { BaseCoachInfo } from "@/pages/search/coach-by-id/components/BaseCoachInfo"
import { Reviews } from "@/pages/search/coach-by-id/components/Reviews"
import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { CoachDatepicker } from "@/pages/search/content/list/content/CoachDatepicker"
import { SelectCreditCardDialog } from "@/pages/search/content/list/content/modals/CoachModalBuySession"
import { useStore } from "effector-react"
import { UserLayout } from "@/oldcomponents/layouts/behaviors/user/UserLayout"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { BookSessionsStatusModalDialog } from "@/pages/search/content/list/content/modals/BookSessionsStatusModalDialog"
import {
  $coach,
  $freeSessionsPickerStore,
  $isNotFound,
  $sessionsPickerStore,
  loadCoachFx,
  mounted
} from "@/pages/search/coach-by-id/models/units"
import { useLocation } from "react-router-dom"
import { $hasFreeSessions } from "@/pages/client/home/home.model"
import { ymLog } from "@/lib/external-services/yandex-metrika/lib"
import { $isLoggedIn } from "@/feature/user/user.model"
import { coachToRedirectAfterSignUpType } from "@/pages/auth/pages/signup/models/types"

const InfoWithSidebar = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  max-width: 900px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 28px;
  `}
  ${MediaRange.greaterThan("tablet")`
    margin-top: 36px;
  `}
`

const BuySidebar = styled.div`
  display: none;
  min-width: 268px;
  width: 268px;
  margin-left: 24px;
  position: relative;
  align-self: flex-start;
  height: auto;

  ${MediaRange.greaterThan("laptop")`
    display: flex;
  `}
`

const BuyBlock = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  ${MediaRange.greaterThan("laptop")`
    display: none;
  `}
`

const CoachInfoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  ${Reviews} {
    margin-top: 24px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 32px;
    `}
  }
`

const MainCoachBlock = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  ${MediaRange.greaterThan("laptop")`
    background: #FFFFFF;
    border-radius: 2px;
    padding: 20px 8px;
  `}

  ${BuyBlock} {
    margin-top: 16px;

    ${MediaRange.greaterThan("mobile")`
      margin-top: 12px;
    `}
  }

  ${AboutCoach} {
    margin-top: 16px;

    ${MediaRange.greaterThan("laptop")`
      margin-top: 0;
    `}
  }
`

export type DatepickerTypes = {
  showFreeSessionsOnly?: boolean
  preSelectedDate?: Date
  preSelectedSessions?: number[]
}

const Datepicker = (props: DatepickerTypes) => {
  const coach = useStore($coach)
  const isLoggedIn = useStore($isLoggedIn)
  const location = useLocation()

  const hasFreeSessions = useStore($hasFreeSessions)

  const shouldShowFreeSessionsOnly = hasFreeSessions || !isLoggedIn
  let data = !!props.showFreeSessionsOnly && shouldShowFreeSessionsOnly ? 
    $freeSessionsPickerStore : 
    $sessionsPickerStore

  useEffect(() => {
    data = !!location.state && shouldShowFreeSessionsOnly ? $freeSessionsPickerStore : $sessionsPickerStore
  }, [hasFreeSessions])

  if (coach) {
    return <CoachDatepicker
      preSelectedDate={props.preSelectedDate}
      preSelectedSessions={props.preSelectedSessions}
      coach={coach}
      sessionsData={data} 
    />
  }
  return null
}

const CardPicker = () => {
  const coach = useStore($coach)

  if (coach) {
    return <SelectCreditCardDialog coach={coach} sessionsData={$sessionsPickerStore} />
  }
  return null
}

export type CoachByIdPageLocationStateTypes = {
  preSelectedDate?: Date
  showFreeSessionsOnly?: boolean
  preSelectedSessions?: number[]
}

export const CoachByIdPage = () => {
  const coach = useStore($coach)
  const pending = useStore(loadCoachFx.pending)
  const isNotFound = useStore($isNotFound)

  const locationState = (useLocation().state as CoachByIdPageLocationStateTypes)

  useEffect(() => {
    ymLog("reachGoal","pushcoachprofile")
  },[])


  return (
    <UserLayout>
      <ContentContainer>
        {isNotFound && <NotFound />}
        {!coach && pending && <Loader />}
        {coach && (
          <InfoWithSidebar>
            <CoachInfoContainer>
              <MainCoachBlock>
                <BaseCoachInfo />
                <BuyBlock>
                  <Datepicker
                    preSelectedDate={locationState?.preSelectedDate}
                    preSelectedSessions={locationState?.preSelectedSessions}
                    showFreeSessionsOnly={locationState?.showFreeSessionsOnly}
                  />
                </BuyBlock>
                <AboutCoach />
              </MainCoachBlock>
              <Reviews />
            </CoachInfoContainer>
            <BuySidebar>
              <Datepicker
                preSelectedDate={locationState?.preSelectedDate}
                preSelectedSessions={locationState?.preSelectedSessions}
                showFreeSessionsOnly={locationState?.showFreeSessionsOnly}
              />
            </BuySidebar>
            <BookSessionsStatusModalDialog />
            <CardPicker />
          </InfoWithSidebar>
        )}
      </ContentContainer>
    </UserLayout>
  )
}

CoachByIdPage[START] = mounted.prepend<ServerParams>(({ params }) => ({ id: parseInt(params.id) }))
