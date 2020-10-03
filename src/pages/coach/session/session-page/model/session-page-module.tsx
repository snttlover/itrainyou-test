import { SessionInfo } from "#/lib/api/coach/get-session"
import { createSessionInfoModule } from "#/pages/coach/session/session-page/model/session-info-module"
import { createEvent, createStore, forward, Event, sample } from "effector-root"
import { createSessionHistoryModule } from "#/pages/coach/session/session-page/model/session-history-module"
import { Pagination } from "#/lib/api/interfaces/utils.interface"
import { GetCoachSessionRequestsQuery, SessionRequest } from "#/lib/api/coach/get-sessions-requests"
import { SessionRequestParams } from "#/lib/api/coach/create-session-request"

type CreateSessionPageConfig = {
  type: "client" | "coach"
  fetchSession: (id: number) => Promise<SessionInfo>
  fetchHistory: (params: GetCoachSessionRequestsQuery) => Promise<Pagination<SessionRequest>>
  writeToUser: Event<number | null>
  createSessionRequest: (params: SessionRequestParams) => Promise<SessionRequest>
}

export const createSessionPage = (config: CreateSessionPageConfig) => {
  const mounted = createEvent<number>()
  const reset = createEvent()

  const changeId = createEvent<number>()
  const $sessionId = createStore<number>(0)
    .on(changeId, (_, id) => id)
    .reset(reset)

  const sessionInfo = createSessionInfoModule(config)
  const sessionRequests = createSessionHistoryModule({
    ...config,
    $sessionId,
  })

  forward({
    from: reset,
    to: [sessionInfo.methods.reset, sessionRequests.methods.reset],
  })

  forward({
    from: mounted,
    to: [changeId, sessionInfo.methods.loadSession, sessionRequests.methods.load],
  })

  forward({
    from: sessionInfo.events.sessionCanceled,
    to: sessionRequests.methods.load
  })

  return {
    modules: {
      sessionInfo,
      sessionRequests,
    },
    methods: {
      mounted,
      reset,
    },
  }
}
