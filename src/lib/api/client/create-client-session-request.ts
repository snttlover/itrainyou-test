import { post } from "#/lib/network/network"
import { SessionRequest } from "#/lib/api/coach/get-sessions-requests"
import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { SessionRequestParams } from "#/lib/api/coach/create-session-request"

export const createClientSessionRequest = (params: SessionRequestParams) =>
  post<SessionRequest, void>(`${config.BACKEND_URL}/api/v1/web/client/session-requests/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
