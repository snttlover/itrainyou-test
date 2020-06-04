import { Category } from "@/application/lib/api/categories"
import { Pagination } from "@/application/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

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
    categories: Category[]
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
    `${process.env.BACKEND_URL}/api/v1/web/clients/me/sessions/`,
    keysToSnake(params)
  )
    .then(response => response.data)
    .then(keysToCamel)
