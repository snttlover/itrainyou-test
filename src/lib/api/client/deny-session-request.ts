import { post } from "#/lib/network/network"
import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { SessionRequest } from "#/lib/api/coach/get-sessions-requests"
import { excludeKeys } from "#/lib/helpers/exclude"
import { DenySessionRequestParams } from "#/lib/api/coach/deny-session-request"

export const denyClientSessionRequest = (params: DenySessionRequestParams) =>
  post<SessionRequest, void>(
    `${config.BACKEND_URL}/api/v1/web/client/session-requests/${params.id}/deny/`,
    keysToSnake(excludeKeys(params, ["id"]))
  )
    .then(response => response.data)
    .then(keysToCamel)
