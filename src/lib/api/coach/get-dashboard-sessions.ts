import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ISODate, Day } from "@/lib/api/interfaces/utils.interface"
import { DurationType } from "@/lib/api/coach-sessions"
import { Client } from "@/lib/api/client/clientInfo"

export interface DashboardSession {
  id: number
  coach: number
  clients: [Client]
  clientPrice: string
  coachPrice: string
  startDatetime: ISODate
  endDatetime: ISODate
  durationType: DurationType
  translationUrl: string
  recordingUrl: string
  hasAwaitingRescheduleRequests: boolean
  materials: []
}

type getDashboardSessionsParams = {
  active?: boolean
  date?: Day
  excludePast?: boolean
}

export const getDashboardSessions = (params?: getDashboardSessionsParams): Promise<DashboardSession[]> =>
  get<DashboardSession[], getDashboardSessionsParams>(
    `${config.BACKEND_URL}/api/v1/web/coaches/me/dashboard/sessions/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
