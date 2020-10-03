import { get } from "#/lib/network/network"
import { Pagination } from "#/lib/api/interfaces/utils.interface"
import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { GetCoachSessionRequestsQuery, SessionRequest } from "#/lib/api/coach/get-sessions-requests"

export const getClientSessionRequests = (params: GetCoachSessionRequestsQuery) =>
  get<Pagination<SessionRequest>, {}>(`${config.BACKEND_URL}/api/v1/web/client/session-requests/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
