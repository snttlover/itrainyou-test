import styled from "styled-components"
// import {AwaitingApproval} from "@/application/pages/coach-answer-pages/awaiting-approval/AwaitingApproval"
// import {ApprovalFailing} from "@/application/pages/coach-answer-pages/approval-failing/ApprovalFailing"
import { ApprovalTimer } from "@/application/pages/coach-answer-pages/approval-timer/ApprovalTimer"

const Container = styled.div`
  background: #eceff1;
  width: 100vw;
  height: 100vh;
`

export const CoachAnswerPages = () => (
  <Container>
    {/*<AwaitingApproval />*/}
    {/*<ApprovalFailing />*/}
    <ApprovalTimer />
  </Container>
)
