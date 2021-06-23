import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { Coach } from "@/lib/api/coach"

export interface CoachSession {
  clients: [any]
  id: number
  coach: number | Coach
  clientPrice: string // example: 12.00
  coachPrice: string // example: 10.00
  startDatetime: ISODate // example: "2020-03-31T15:17:37Z"
  endDatetime: string
  durationType: DurationType //example: 01:00:00
  isFreeSession: boolean
}

export type DurationType = "PROMO" | "D30" | "D45" | "D60" | "D90"

export interface GetCoachSessionsParamsTypes {
  start_date__lte?: string
  start_date__gte?: string
  start_date?: string
  duration_type?: DurationType
  is_free_session?: boolean
}

export const getCoachSessions = (id: number | "me", params: GetCoachSessionsParamsTypes): Promise<CoachSession[]> =>
  get<CoachSession[], GetCoachSessionsParamsTypes>(`${config.BACKEND_URL}/api/v1/web/coaches/${id}/sessions/`, params)
    .then(response => response.data)
    .then(keysToCamel)
