import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

export type getCardSessionsResponse = {
  id: number
  coach: number
  clientPrice: string
  coachPrice: string
  startDatetime: string
    endDatetime: string
  durationType: string
  translationUrl: string
  recordingUrl: string
  materials: number[]
}

export const getCardSessions = (id: number) =>
  get<Pagination<getCardSessionsResponse>>(`${config.BACKEND_URL}/api/v1/web/client/cards/${id}/sessions/`)
    .then(response => response.data)
    .then(keysToCamel)