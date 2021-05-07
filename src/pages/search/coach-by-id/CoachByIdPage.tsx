import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import { ServerParams, START } from "@/lib/effector"
import { MediaRange } from "@/lib/responsive/media"
import { AboutCoach } from "@/pages/search/coach-by-id/components/AboutCoach"
import { BaseCoachInfo } from "@/pages/search/coach-by-id/components/BaseCoachInfo"
import { Reviews } from "@/pages/search/coach-by-id/components/Reviews"
import * as React from "react"
import styled from "styled-components"
import { CoachDatepicker } from "@/pages/search/content/list/content/CoachDatepicker"
import { SelectCreditCardDialog } from "@/pages/search/content/list/content/modals/CoachModalBuySession"
import { useGate, useStore } from "effector-react"
import { UserLayout } from "@/oldcomponents/layouts/behaviors/user/UserLayout"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { BookSessionsStatusModalDialog } from "@/pages/search/content/list/content/modals/BookSessionsStatusModalDialog"
import {
  $coach,
  $isNotFound,
  $sessionsPickerStore,
  loadCoachFx,
  mounted
} from "@/pages/search/coach-by-id/models/units"

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

const Datepicker = () => {
  const coach = useStore($coach)

  if (coach) {
    return <CoachDatepicker coach={coach} sessionsData={$sessionsPickerStore} />
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

export const CoachByIdPage = () => {
  const coach = useStore($coach)
  const pending = useStore(loadCoachFx.pending)
  const isNotFound = useStore($isNotFound)


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
                  <Datepicker />
                </BuyBlock>
                <AboutCoach />
              </MainCoachBlock>
              <Reviews />
            </CoachInfoContainer>
            <BuySidebar>
              <Datepicker />
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
