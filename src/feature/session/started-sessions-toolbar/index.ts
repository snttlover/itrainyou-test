import { createStartSessionToolbarModel } from "@/feature/session/started-sessions-toolbar/create-start-session-toolbar.model"
import { getDashboardSessions } from "@/lib/api/coach/get-dashboard-sessions"
import { createStartedSessionsToolbar } from "@/feature/session/started-sessions-toolbar/StartedSessionToolbar"
import { getClientSessions } from "@/lib/api/client-session"
import { clientCall, coachCall } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"

const coachSessionsToolbarModel = createStartSessionToolbarModel({
  type: "coach",
  fetchSessions: () => getDashboardSessions({ excludePast: true }),
  connect: coachCall.methods.connectToSession
})

export const CoachStartedSessionsToolbar = createStartedSessionsToolbar(coachSessionsToolbarModel)

const clientSessionsToolbarModel = createStartSessionToolbarModel({
  type: "client",
  fetchSessions: () => getClientSessions({ excludePast: true }).then(pagnation => pagnation.results),
  connect: clientCall.methods.connectToSession
})

export const ClientStartedSessionsToolbar = createStartedSessionsToolbar(clientSessionsToolbarModel)
