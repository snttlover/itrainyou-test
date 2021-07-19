import { CoachDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/old-components/layouts/ContentContainer"
import { Loader } from "@/old-components/spinner/Spinner"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { MediaRange } from "@/lib/responsive/media"
import { ApprovalFailing } from "@/pages/coach/home/approval-failing/ApprovalFailing"
import { ApprovalTimerOver } from "@/pages/coach/home/approval-timer-over/ApprovalTimerOver"
import { ApprovalTimer } from "@/pages/coach/home/approval-timer/ApprovalTimer"
import { AwaitingApproval } from "@/pages/coach/home/awaiting-approval/AwaitingApproval"
import { $coachHomeState } from "@/pages/coach/home/coach-home.model"
import { CoachGetAccess } from "@/pages/coach/home/get-access/CoachGetAccess"
import { CoachSessionsPage } from "@/pages/coach/home/sessions/CoachSessionsPage"
import { YandexKassaInstructions } from "@/pages/coach/home/yandex-kassa-not-approved/YandexKassaInstructions"
import { YandexKassaWaitingForApproval } from "@/pages/coach/home/yandex-kassa-not-approved/YandexKassaWaitingForApproval"
import { useGate, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { CoachHomeGate } from "@/pages/coach/home/sessions/coach-sessions-page.model"
import { TinkoffApproved } from "@/pages/coach/home/tinkoff/TinkoffApproved"

const Container = styled.div`
  max-width: 640px;
  margin: 36px 0 0;
  position: relative;
  ${MediaRange.greaterThan("mobile")`
  `}
  ${MediaRange.greaterThan("tablet")`
    padding: 0;
  `}  
  ${MediaRange.greaterThan("laptop")`
    padding: 0;
    width: 80%;
    max-width: 640px;
  `}
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  padding: 0 16px;
  ${MediaRange.greaterThan("mobile")`
    font-size: 24px;
    line-height: 26px;
    padding: 0;
  `}
`

const Description = styled.p`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;

  padding: 0 16px;
  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
    padding: 0;
  `}
`

const CurrentState = () => {
  const state = useStore($coachHomeState)
  return (
    <>
      <ContentContainer>
        {state === "profile-fill" && (
          <Container>
            <Title>У вас пока закрыт доступ к функционалу коуча</Title>
            <Description>Заполните все поля, которые вы пропустили на этапе регистрации</Description>
            <CoachGetAccess />
          </Container>
        )}
        {state === "approve-wait" && <AwaitingApproval />}
        {state === "forever-rejected" && <ApprovalFailing />}
        {state === "temporary-rejected-wait" && <ApprovalTimer />}
        {state === "temporary-rejected-done" && <ApprovalTimerOver />}
        {state === "yandex-kassa-completed" && <YandexKassaWaitingForApproval />}
        {state === "yandex-kassa-not-approved" && <YandexKassaInstructions />}
      </ContentContainer>
      {state === "tinkoff" && <TinkoffApproved />}
      {state === "approved" && <CoachSessionsPage />}
    </>
  )
}

export const CoachHome = () => {
  const isUserDataLoading = useStore(getMyUserFx.pending)

  useGate(CoachHomeGate)

  return (
    <CoachDashboardLayout>
      {!isUserDataLoading && <CurrentState />}

      <ContentContainer>
        {isUserDataLoading && <Loader />}
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachHome