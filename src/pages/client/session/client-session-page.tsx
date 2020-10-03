import { createSessionPage } from "#/pages/coach/session/session-page/model/session-page-module"
import { writeToCoach } from "#/feature/chat/modules/write-to-coach"
import { createClientSessionRequest } from "#/lib/api/client/create-client-session-request"
import { getClientSessionRequests } from "#/lib/api/client/get-client-session-requests"
import { getClientSession } from "#/lib/api/client/get-client-session"

export const clientSessionPage = createSessionPage({
  type: `client`,
  fetchSession: getClientSession,
  fetchHistory: getClientSessionRequests,
  writeToUser: writeToCoach,
  createSessionRequest: createClientSessionRequest
})
