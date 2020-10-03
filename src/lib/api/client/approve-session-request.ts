import { post } from "#/lib/network/network"
import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { SessionRequest } from "#/lib/api/coach/get-sessions-requests"
import { ApproveSessionRequestParams } from "#/lib/api/coach/approve-session-request"

export const approveClientSessionRequest = (params: ApproveSessionRequestParams) =>
  post<SessionRequest, {}>(`${config.BACKEND_URL}/api/v1/web/client/session-requests/${params.id}/approve/`, {})
    .then(response => response.data)
    .then(keysToCamel)
