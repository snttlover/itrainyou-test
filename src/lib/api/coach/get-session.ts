import { get } from "#/lib/network/network"
import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { DashboardSession } from "#/lib/api/coach/get-dashboard-sessions"
import { Coach } from "#/lib/api/coach"

export type SessionInfo = DashboardSession & {
  coach: Coach
}

export const getCoachSession = (id: number): Promise<SessionInfo> =>
  get(`${config.BACKEND_URL}/api/v1/web/coach/sessions/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)
