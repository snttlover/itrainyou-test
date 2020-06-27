import { config } from "@/config"
import { SessionCategory } from "@/lib/api/categories"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface GetClientSessionsParams {
  startDate?: string
  active?: boolean
}

export interface ClientSession {
  id: number
  coach: {
    id: number
    firstName: string
    lastName: string
    birthDate: string
    sex: "M" | "F"
    avatar: string
    isTopCoach: boolean
    creation_datetime: string
    categories: SessionCategory[]
  }
  clientPrice: string
  coachPrice: string
  startDatetime: string
  endDatetime: string
  durationType: string
  translationUrl: string
  recordingUrl: string
  materials: string[]
}

export const getClientSessions = (params: GetClientSessionsParams) =>
  get<Pagination<ClientSession>, GetClientSessionsParams>(
    `${config.BACKEND_URL}/api/v1/web/clients/me/sessions/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
