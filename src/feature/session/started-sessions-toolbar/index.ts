import { createStartSessionToolbarModel } from "#/feature/session/started-sessions-toolbar/create-start-session-toolbar.model"
import { getDashboardSessions } from "#/lib/api/coach/get-dashboard-sessions"
import { createStartedSessionsToolbar } from "#/feature/session/started-sessions-toolbar/StartedSessionToolbar"
import { getClientSessions } from "#/lib/api/client-session"
import { clientCall, coachCall } from "#/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { clientChatsSocket, coachChatsSocket } from "#/feature/socket/chats-socket"

const coachSessionsToolbarModel = createStartSessionToolbarModel({
  type: "coach",
  fetchSessions: () => getDashboardSessions({ excludePast: true }),
  sessionCallModule: coachCall,
  socket: coachChatsSocket,
})

export const CoachStartedSessionsToolbar = createStartedSessionsToolbar(coachSessionsToolbarModel)

const clientSessionsToolbarModel = createStartSessionToolbarModel({
  type: "client",
  fetchSessions: () => getClientSessions({ excludePast: true }).then(pagnation => pagnation.results),
  sessionCallModule: clientCall,
  socket: clientChatsSocket,
})

export const ClientStartedSessionsToolbar = createStartedSessionsToolbar(clientSessionsToolbarModel)
