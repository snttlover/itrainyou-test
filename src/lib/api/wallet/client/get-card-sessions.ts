import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

type CoachCategoryListItemType = {
    id: number
    name: string
    icon: string
    description: string
}

export type CoachItemType = {
    id?: number
    firstName: string
    lastName: string
    birthDate: string
    sex: string
    avatar: string
    rating: string
    isTopCoach: boolean
    categories: CoachCategoryListItemType[]
    creationDatetime: string
}

export type CardSessionsResponse = {
    id: number
    coach: CoachItemType
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
  get<Pagination<CardSessionsResponse>>(`${config.BACKEND_URL}/api/v1/web/client/cards/${id}/sessions/`)
    .then(response => response.data)
    .then(keysToCamel)
