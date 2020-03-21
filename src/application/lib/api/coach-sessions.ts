import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface CoachSession {
  id: number
  coach: number
  client_price: string // example: 12.00
  coach_price: string // example: 10.00
  start_datetime: string // example: "2020-03-31T15:17:37Z"
  duration: string //example: 01:00:00
}


export interface GetCoachSessionsParamsTypes {
  start_date__lte?: string
  start_date__gte?: string
  start_date?: string
}

export const getCoachSessions = (id: number, params: GetCoachSessionsParamsTypes) =>
  get<CoachSession, GetCoachSessionsParamsTypes>(`http://142.93.228.206:8006/api/v1/web/coaches/${id}/sessions`, params)
    .then(response => response.data)
    .then(keysToCamel)
