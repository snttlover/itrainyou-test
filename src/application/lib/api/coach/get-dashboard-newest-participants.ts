import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"
import { ISODate, Pagination } from "@/application/lib/api/interfaces/utils.interface"
import { Client } from "@/application/lib/api/client/clientInfo"
import { DurationType } from "@/application/lib/api/coach-sessions"

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
    `${process.env.BACKEND_URL}/api/v1/web/coaches/me/dashboard/newest-participants/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
