import React, { useEffect } from "react"
import { CoachDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

import { SessionPageContainer as Container } from "@/pages/client/session/content/session-page-content/common/SessionPageContainer"
import { SessionPageContent as Content } from "@/pages/client/session/content/session-page-content/common/SessionPageContent"
import { SessionPageInfoWrapper as InfoWrapper } from "@/pages/client/session/content/session-page-content/common/SessionPageInfoWrapper"
import { UserHeader } from "@/pages/client/session/content/session-page-content/UserHeader"
import {
  SessionInfo,
  TabletSessionInfo
} from "@/pages/client/session/content/session-page-content/session-info/SessionInfo"
import { coachSessionPage } from "@/pages/coach/session/coach-session-page"
import { useParams } from "react-router-dom"
import { useEvent, useStore } from "effector-react"
import { Loader } from "@/old-components/spinner/Spinner"
import { NotFound } from "@/feature/not-found/components/NotFound"
import { SessionsHistory } from "@/pages/client/session/content/session-page-content/session-history/SessionsHistory"
import {
  CancelSession,
  TabletCancelSession,
} from "@/pages/client/session/content/session-page-content/cancel-session/CancelSession"

export const CoachSessionPage = () => {
  const params = useParams<{ id: string }>()

  const sessionInfo = useStore(coachSessionPage.modules.sessionInfo.data.$info)
  const fetching = useStore(coachSessionPage.modules.sessionInfo.data.isFetching)
  const notFound = useStore(coachSessionPage.modules.sessionInfo.data.$notFound)

  const canceled = useStore(coachSessionPage.data.canceled)
    
  const sessionsRequests = useStore(coachSessionPage.modules.sessionRequests.data.$sessions)

  const cancelVisibility = useStore(coachSessionPage.modules.sessionInfo.data.$cancelButtonVisibility)

  const mounted = useEvent(coachSessionPage.methods.mounted)
  const unmount = useEvent(coachSessionPage.methods.reset)

  const write = useEvent(coachSessionPage.modules.sessionInfo.methods.write)
  const cancelSession = useEvent(coachSessionPage.modules.sessionInfo.methods.cancelSession)

  useEffect(() => {
    mounted(parseInt(params.id))
    return () => unmount()
  }, [])

  return (
    <CoachDashboardLayout>
      {notFound && <NotFound />}
      {fetching && <Loader />}
      {!fetching && !notFound && !!sessionInfo.id && (
        <Container>
          <Content>
            <UserHeader {...sessionInfo} onWrite={write} />

            <TabletSessionInfo {...sessionInfo} />

            {!sessionInfo.isOver && cancelVisibility && (
              <TabletCancelSession
                sessionStartDatetime={sessionInfo.sessionStartDatetime}
                onCancel={() => cancelSession()}
                canceled={canceled}
              />
            )}

            {!!sessionsRequests.length && (
              <SessionsHistory
                pagination={coachSessionPage.modules.sessionRequests.modules.pagination}
                list={sessionsRequests}
              />
            )}
          </Content>
          <InfoWrapper>
            <SessionInfo {...sessionInfo} />
            {!sessionInfo.isOver && cancelVisibility && (
              <CancelSession sessionStartDatetime={sessionInfo.sessionStartDatetime} onCancel={() => cancelSession()} canceled={canceled} />
            )}
          </InfoWrapper>
        </Container>
      )}
    </CoachDashboardLayout>
  )
}
