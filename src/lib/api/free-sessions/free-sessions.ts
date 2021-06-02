import { config } from "@/config"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { DurationType } from "@/lib/api/coach-sessions"

/*export interface GetFreeSessionsParams {
  startDate?: string
  active?: boolean
  excludePast?: boolean
}*/

export interface GetFreeSessionsParams {
  start_date__lte?: string
  start_date__gte?: string
  start_date?: string
}


export const getFreeSessionsList = (params: GetFreeSessionsParams) =>
  get<DashboardSession[], GetFreeSessionsParams>(
    `${config.BACKEND_URL}/api/v1/web/client/free-sessions/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
