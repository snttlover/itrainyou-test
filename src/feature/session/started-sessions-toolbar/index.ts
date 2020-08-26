import { createStartSessionToolbarModel } from "@/feature/session/started-sessions-toolbar/create-start-session-toolbar.model"
import { getDashboardSessions } from "@/lib/api/coach/get-dashboard-sessions"
import { createStartedSessionsToolbar } from "@/feature/session/started-sessions-toolbar/StartedSessionToolbar"
import { getClientSessions } from "@/lib/api/client-session"

const coachSessionsToolbarModel = createStartSessionToolbarModel({
  type: "coach",
  fetchSessions: () => getDashboardSessions({ excludePast: true }),
})

export const CoachStartedSessionsToolbar = createStartedSessionsToolbar(coachSessionsToolbarModel)

const clientSessionsToolbarModel = createStartSessionToolbarModel({
  type: "client",
  fetchSessions: () => getClientSessions({ excludePast: true }).then(pagnation => pagnation.results),
})

export const ClientStartedSessionsToolbar = createStartedSessionsToolbar(clientSessionsToolbarModel)
