import { post } from "@/lib/network/network"
import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { excludeKeys } from "@/lib/helpers/exclude"

export type DenySessionRequestProblems = "COACH_ABSENT" | "COACH_INADEQUATE" | "OTHER" | string

export type DenySessionRequestParams = {
  id: number
  problem?: DenySessionRequestProblems
  problemText?: string
}

export const denyCoachSessionRequest = (params: DenySessionRequestParams) =>
  post<SessionRequest, void>(
    `${config.BACKEND_URL}/api/v1/web/coach/session-requests/${params.id}/deny/`,
    keysToSnake(excludeKeys(params, ["id"]))
  )
    .then(response => response.data)
    .then(keysToCamel)
