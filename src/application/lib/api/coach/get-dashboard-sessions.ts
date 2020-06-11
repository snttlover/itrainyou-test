import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"
import { ISODate, Sex, Pagination, Day } from "@/application/lib/api/interfaces/utils.interface"
import { DurationType } from "@/application/lib/api/coach-sessions"

type DashboardSessionClient = {
  id: number
  firstName: string
  lastName: string
  birthDate: Day
  sex: Sex
  avatar: string
  creationDatetime: ISODate
}

export interface DashboardSession {
  id: number
  coach: number
  clients: [DashboardSessionClient]
  clientPrice: string
  coachPrice: string
  startDatetime: ISODate
  endDatetime: ISODate
  durationType: DurationType
  translationUrl: string
  recordingUrl: string
  materials: []
}

type getDashboardSessionsParams = {
  active?: boolean
  date?: Day
}

export const getDashboardSessions = (params?: getDashboardSessionsParams) =>
  get<DashboardSession[], getDashboardSessionsParams>(`${process.env.BACKEND_URL}/api/v1/web/coaches/me/dashboard/sessions//`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
