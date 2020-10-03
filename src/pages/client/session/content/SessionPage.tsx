import React from "react"
import {
  RescheduleSession,
  TabletRescheduleSession,
} from "#/pages/client/session/content/session-page-content/reschedule-session/RescheduleSession"
import { SessionPageContainer as Container } from "#/pages/client/session/content/session-page-content/common/SessionPageContainer"
import { SessionPageContent as Content } from "#/pages/client/session/content/session-page-content/common/SessionPageContent"
import { SessionPageInfoWrapper as InfoWrapper } from "#/pages/client/session/content/session-page-content/common/SessionPageInfoWrapper"

export const SessionPage = () => (
  <Container>
    <Content>

      <TabletRescheduleSession />

    </Content>
    <InfoWrapper>

      <RescheduleSession />
    </InfoWrapper>
  </Container>
)
