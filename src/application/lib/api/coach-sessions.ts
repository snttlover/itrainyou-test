import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface CoachSession {
  id: number
  coach: number
  clientPrice: string // example: 12.00
  coachPrice: string // example: 10.00
  startDatetime: string // example: "2020-03-31T15:17:37Z"
  duration: string //example: 01:00:00
}

export type DurationType = 'D30' | 'D45' | 'D60' |'D90'

export interface GetCoachSessionsParamsTypes {
  start_date__lte?: string
  start_date__gte?: string
  start_date?: string
  duration_type?: DurationType
}

export const getCoachSessions = (id: number, params: GetCoachSessionsParamsTypes) =>
  get<CoachSession, GetCoachSessionsParamsTypes>(`https://dev.itrainyou.heksray.com/api/v1/web/coaches/${id}/sessions`, params)
    .then(response => response.data)
    .then(keysToCamel)
