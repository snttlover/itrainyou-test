import React, { useEffect } from "react"
import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"

import { SessionPageContainer as Container } from "@/pages/client/session/content/session-page-content/common/SessionPageContainer"
import { SessionPageContent as Content } from "@/pages/client/session/content/session-page-content/common/SessionPageContent"
import { SessionPageInfoWrapper as InfoWrapper } from "@/pages/client/session/content/session-page-content/common/SessionPageInfoWrapper"
import { UserHeader } from "@/pages/client/session/content/session-page-content/UserHeader"
import { SessionInfo } from "@/pages/client/session/content/session-page-content/session-info/SessionInfo"
import { useParams } from "react-router-dom"
import { useEvent, useStore } from "effector-react/ssr"
import { Loader } from "@/components/spinner/Spinner"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { SessionsHistory } from "@/pages/client/session/content/session-page-content/session-history/SessionsHistory"
import {
  CancelSession,
  TabletCancelSession,
} from "@/pages/client/session/content/session-page-content/cancel-session/CancelSession"
import { clientSessionPage } from "@/pages/client/session/client-session-page"

export const ClientSessionPage = () => {
  const params = useParams<{ id: string }>()

  const sessionInfo = useStore(clientSessionPage.modules.sessionInfo.data.$info)
  const fetching = useStore(clientSessionPage.modules.sessionInfo.data.isFetching)
  const notFound = useStore(clientSessionPage.modules.sessionInfo.data.$notFound)
  const sessionsRequests = useStore(clientSessionPage.modules.sessionRequests.data.$sessions)

  const mounted = useEvent(clientSessionPage.methods.mounted)
  const unmount = useEvent(clientSessionPage.methods.reset)

  const write = useEvent(clientSessionPage.modules.sessionInfo.methods.write)
  const cancelSession = useEvent(clientSessionPage.modules.sessionInfo.methods.cancelSession)

  useEffect(() => {
    mounted(parseInt(params.id))
    return () => unmount()
  }, [])

  return (
    <ClientDashboardLayout>
      {notFound && <NotFound />}
      {fetching && <Loader />}
      {!fetching && !notFound && !!sessionInfo.id && (
        <Container>
          <Content>
            <UserHeader {...sessionInfo} onWrite={write} />

            <TabletCancelSession
              sessionStartDatetime={sessionInfo.sessionStartDatetime}
              onCancel={() => cancelSession()}
            />

            {!!sessionsRequests.length && (
              <SessionsHistory
                pagination={clientSessionPage.modules.sessionRequests.modules.pagination}
                list={sessionsRequests}
              />
            )}
          </Content>
          <InfoWrapper>
            <SessionInfo {...sessionInfo} />
            <CancelSession sessionStartDatetime={sessionInfo.sessionStartDatetime} onCancel={() => cancelSession()} />
          </InfoWrapper>
        </Container>
      )}
    </ClientDashboardLayout>
  )
}
