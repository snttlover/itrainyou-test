import { post } from "@/lib/network/network"
import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { SessionRequest, SessionRequestTypes } from "@/lib/api/coach/get-sessions-requests"

export type SessionRequestParams = {
  session: number,
  type: SessionRequestTypes
}

export const createCoachSessionRequest = (params: SessionRequestParams) =>
  post<SessionRequest, void>(`${config.BACKEND_URL}/api/v1/web/coach/session-requests/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
