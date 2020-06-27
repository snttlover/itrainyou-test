import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { Loader } from "@/components/spinner/Spinner"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { MediaRange } from "@/lib/responsive/media"
import { ApprovalFailing } from "@/pages/coach/home/approval-failing/ApprovalFailing"
import { ApprovalTimerOver } from "@/pages/coach/home/approval-timer-over/ApprovalTimerOver"
import { ApprovalTimer } from "@/pages/coach/home/approval-timer/ApprovalTimer"
import { AwaitingApproval } from "@/pages/coach/home/awaiting-approval /AwaitingApproval"
import { $coachHomeState } from "@/pages/coach/home/coach-home.model"
import { CoachGetAccess } from "@/pages/coach/home/get-access/CoachGetAccess"
import { CoachSessionsPage } from "@/pages/coach/home/sessions/CoachSessionsPage"
import { useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  max-width: 600px;
  margin: 36px 0 0;
  position: relative;
  ${MediaRange.greaterThan("mobile")`
    width: 80%;
  `}
  ${MediaRange.greaterThan("tablet")`
    padding: 0;
    width: 80%;
  `}  
  ${MediaRange.greaterThan("laptop")`
    padding: 0;
    width: 600px;
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
      {state === "approved" && <CoachSessionsPage />}
    </>
  )
}

export const CoachHome = () => {
  const isUserDataLoading = useStore(getMyUserFx.pending)

  return (
    <CoachDashboardLayout>
      <ContentContainer>
        {!isUserDataLoading && <CurrentState />}
        {isUserDataLoading && <Loader />}
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachHome
