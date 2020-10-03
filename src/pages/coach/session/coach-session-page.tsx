import { createSessionPage } from "#/pages/coach/session/session-page/model/session-page-module"
import { getCoachSession } from "#/lib/api/coach/get-session"
import { getCoachSessionRequests } from "#/lib/api/coach/get-sessions-requests"
import { writeToClient } from "#/feature/chat/modules/write-to-coach"
import { createCoachSessionRequest } from "#/lib/api/coach/create-session-request"

export const coachSessionPage = createSessionPage({
  type: `coach`,
  fetchSession: getCoachSession,
  fetchHistory: getCoachSessionRequests,
  writeToUser: writeToClient,
  createSessionRequest: createCoachSessionRequest
})
