import React from "react"
import { UserHeader } from "@/pages/client/session/content/session-page-content/UserHeader"
import { SessionsHistory } from "@/pages/client/session/content/session-page-content/session-history/SessionsHistory"
import {
  SessionInfo,
  TabletSessionInfo,
} from "@/pages/client/session/content/session-page-content/session-info/SessionInfo"
import {
  RescheduleSession,
  TabletRescheduleSession,
} from "@/pages/client/session/content/session-page-content/reschedule-session/RescheduleSession"
import {
  CancelSession,
  TabletCancelSession,
} from "@/pages/client/session/content/session-page-content/cancel-session/CancelSession"
import { SessionPageContainer as Container } from "@/pages/client/session/content/session-page-content/common/SessionPageContainer"
import { SessionPageContent as Content } from "@/pages/client/session/content/session-page-content/common/SessionPageContent"
import { SessionPageInfoWrapper as InfoWrapper } from "@/pages/client/session/content/session-page-content/common/SessionPageInfoWrapper"

export const SessionPage = () => (
  <Container>
    <Content>

      <TabletRescheduleSession />
      <TabletCancelSession />

    </Content>
    <InfoWrapper>

      <RescheduleSession />
      <CancelSession />
    </InfoWrapper>
  </Container>
)
