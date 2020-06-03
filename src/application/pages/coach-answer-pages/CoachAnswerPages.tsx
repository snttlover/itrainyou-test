import styled from "styled-components"
import {AwaitingApproval} from "@/application/pages/coach-answer-pages/awaiting-approval /AwaitingApproval"

const Container = styled.div`
  background: #ECEFF1;
  width: 100vw;
  height: 100vh;
`

export const CoachAnswerPages = () => (
  <Container>
    <AwaitingApproval />
  </Container>
)
