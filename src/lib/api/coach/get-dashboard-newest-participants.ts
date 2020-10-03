import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { get } from "#/lib/network/network"
import { ISODate, Pagination } from "#/lib/api/interfaces/utils.interface"
import { Client } from "#/lib/api/client/clientInfo"
import { DurationType } from "#/lib/api/coach-sessions"

export interface DashboardNewestParticipant {
  client: Client
  session: {
    id: number
    coach: number
    startDatetime: ISODate
    endDatetime: ISODate
    durationType: DurationType
  }
}

export interface getNewestParticipantsParams {
  page: number
  pageSize: number
}

export const getDashboardNewestParticipants = (params?: getNewestParticipantsParams) =>
  get<Pagination<DashboardNewestParticipant>, getNewestParticipantsParams>(
    `${config.BACKEND_URL}/api/v1/web/coaches/me/dashboard/newest-participants/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
