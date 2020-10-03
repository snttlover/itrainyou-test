import { post } from "#/lib/network/network"
import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { SessionRequest } from "#/lib/api/coach/get-sessions-requests"

export type ApproveSessionRequestParams = {
  id: number
}

export const approveCoachSessionRequest = (params: ApproveSessionRequestParams) =>
  post<SessionRequest, {}>(`${config.BACKEND_URL}/api/v1/web/coach/session-requests/${params.id}/approve/`, {})
    .then(response => response.data)
    .then(keysToCamel)
