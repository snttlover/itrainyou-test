import React from "react"
import styled from "styled-components"
import { UserHeader } from "@/pages/client/session/content/session-page-content/UserHeader"
import { MediaRange } from "@/lib/responsive/media"
// import { SessionMaterials } from "@/pages/client/session/content/session-page-content/session-materials/SessionMaterials"
import { SessionsHistory } from "@/pages/client/session/content/session-page-content/session-history/SessionsHistory"
import { SessionInfo } from "@/pages/client/session/content/session-page-content/session-info/SessionInfo"
// import { AddMaterial } from "@/pages/client/session/content/session-page-content/add-material/AddMaterial"
import { RescheduleSession } from "@/pages/client/session/content/session-page-content/reschedule-session/RescheduleSession"
import { CancelSession } from "@/pages/client/session/content/session-page-content/cancel-session/CancelSession"

export const SessionPage = () => (
  <Container>
    <Content>
      <UserHeader />

      <TabletSessionInfo />

      {/*<TabletAddMaterial />*/}
      <TabletRescheduleSession />
      <TabletCancelSession />

      {/*<SessionMaterials />*/}
      <SessionsHistory />
    </Content>
    <SessionInfoWrapper>
      <SessionInfo />

      {/*<AddMaterial />*/}
      <RescheduleSession />
      <CancelSession />
    </SessionInfoWrapper>
  </Container>
)

const Container = styled.div`
  display: flex;
  padding: 36px 20px 20px;
  width: 100%;
  max-width: 892px;
  margin: 0 auto;
  ${MediaRange.lessThan(`tablet`)`
    max-width: 600px;
  `}

  ${MediaRange.lessThan(`mobile`)`
      padding: 24px 16px;
  `}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
  flex: 1;
  ${MediaRange.lessThan(`tablet`)`
    margin-right: 0;
  `}
`

const SessionInfoWrapper = styled.div`
  width: 268px;
  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`

const TabletSessionInfo = styled(SessionInfo)`
  display: none;
  ${MediaRange.lessThan(`tablet`)`
    display: flex;
  `}
`

// const TabletAddMaterial = styled(AddMaterial)`
//   display: none;
//   ${MediaRange.lessThan(`tablet`)`
//     display: flex;
//   `}
// `

const TabletRescheduleSession = styled(RescheduleSession)`
  display: none;
  ${MediaRange.lessThan(`tablet`)`
    display: flex;
  `}
`

const TabletCancelSession = styled(CancelSession)`
  display: none;
  ${MediaRange.lessThan(`tablet`)`
    display: flex;
  `}
`
