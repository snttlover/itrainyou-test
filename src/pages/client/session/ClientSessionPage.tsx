import React, { useEffect } from "react"
import { ClientDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/client/ClientDashboardLayout"

import { SessionPageContainer as Container } from "@/pages/client/session/content/session-page-content/common/SessionPageContainer"
import { SessionPageContent as Content } from "@/pages/client/session/content/session-page-content/common/SessionPageContent"
import { SessionPageInfoWrapper as InfoWrapper } from "@/pages/client/session/content/session-page-content/common/SessionPageInfoWrapper"
import { UserHeader } from "@/pages/client/session/content/session-page-content/UserHeader"
import {
  SessionInfo,
  TabletSessionInfo
} from "@/pages/client/session/content/session-page-content/session-info/SessionInfo"
import { useParams } from "react-router-dom"
import { useEvent, useStore } from "effector-react"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { SessionsHistory } from "@/pages/client/session/content/session-page-content/session-history/SessionsHistory"
import {
  CancelSession,
  TabletCancelSession,
} from "@/pages/client/session/content/session-page-content/cancel-session/CancelSession"
import { clientSessionPage } from "@/pages/client/session/client-session-page"
import {
  RescheduleSession,
  TabletRescheduleSession
} from "@/pages/client/session/content/session-page-content/reschedule-session/RescheduleSession"
import { resetRescheduleDialog } from "@/pages/client/session/content/session-page-content/reschedule-session/reschedule-session"

export const ClientSessionPage = () => {
  const params = useParams<{ id: string }>()

  const clearSession = useStore(clientSessionPage.modules.sessionInfo.data.$session)
  const sessionInfo = useStore(clientSessionPage.modules.sessionInfo.data.$info)
  const fetching = useStore(clientSessionPage.modules.sessionInfo.data.isFetching)
  const notFound = useStore(clientSessionPage.modules.sessionInfo.data.$notFound)
  const sessionsRequests = useStore(clientSessionPage.modules.sessionRequests.data.$sessions)

  const cancelVisibility = useStore(clientSessionPage.modules.sessionInfo.data.$cancelButtonVisibility)

  const mounted = useEvent(clientSessionPage.methods.mounted)
  const unmount = useEvent(clientSessionPage.methods.reset)

  const write = useEvent(clientSessionPage.modules.sessionInfo.methods.write)
  const cancelSession = useEvent(clientSessionPage.modules.sessionInfo.methods.cancelSession)

  const resetReschedule = useEvent(resetRescheduleDialog)

  useEffect(() => {
    mounted(parseInt(params.id))
    return () => {
      unmount()
      resetReschedule()
    }
  }, [])

  return (
    <ClientDashboardLayout>
      {notFound && <NotFound />}
      {fetching && <Loader />}
      {!fetching && !notFound && !!sessionInfo.id && (
        <Container>
          <Content>
            <UserHeader {...sessionInfo} onWrite={write} />

            <TabletSessionInfo {...sessionInfo} />

            {!sessionInfo.isOver && !clearSession?.hasAwaitingRescheduleRequests && <TabletRescheduleSession />}

            {!sessionInfo.isOver && cancelVisibility && (
              <TabletCancelSession
                sessionStartDatetime={sessionInfo.sessionStartDatetime}
                onCancel={() => cancelSession()}
              />
            )}

            {!!sessionsRequests.length && (
              <SessionsHistory
                pagination={clientSessionPage.modules.sessionRequests.modules.pagination}
                list={sessionsRequests}
              />
            )}
          </Content>
          <InfoWrapper>
            <SessionInfo {...sessionInfo} />
            {!sessionInfo.isOver && !clearSession?.hasAwaitingRescheduleRequests && <RescheduleSession />}
            {!sessionInfo.isOver && cancelVisibility && (
              <CancelSession sessionStartDatetime={sessionInfo.sessionStartDatetime} onCancel={() => cancelSession()} />
            )}
          </InfoWrapper>
        </Container>
      )}
    </ClientDashboardLayout>
  )
}
