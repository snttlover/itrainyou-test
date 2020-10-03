import { config } from "#/config"
import { Pagination, Sex } from "./interfaces/utils.interface"
import { keysToCamel } from "../network/casing"
import { get } from "../network/network"

type CoachCategoryListItemType = {
  id: number
  name: string
  icon: string
  description: string
}

export interface CoachUser {
  id: number
  firstName: string
  lastName: string
  birthDate: string
  sex: Sex
  avatar: string | null
  isTopCoach: boolean
  categories: CoachCategoryListItemType[]
  creationDatetime: string
}

export type Coach = {
  id: number
  user: {
    id: number
    email: string
    creationDatetime: string
  }
  prices: {
    D30: null | number
    D45: null | number
    D60: null | number
    D90: null | number
  }
  duration: string

  isApproved: string
  photos: string[]
  description: string
  workExperience: string
  education: string
  rating: number
  reviewsCount: number
  nearestSessionDatetime: string
} & CoachUser

export type CoachSortingType = `price` | `-price` | `popularity` | `nearest_session_datetime`

export interface GetCoachesParamsTypes {
  session_duration_types?: string
  price__lte?: number
  price__gte?: number
  price?: number
  is_top_coach?: boolean
  categories?: string
  rating?: number
  rating__gte?: number
  search?: string
  nearest_session_date__gte?: string // YYYY-MM-DD
  nearest_session_date__lte?: string
  ordering?: CoachSortingType
}

export const getCoaches = (params: GetCoachesParamsTypes) =>
  get<Pagination<Coach>, GetCoachesParamsTypes>(`${config.BACKEND_URL}/api/v1/web/coaches/`, params)
    .then(response => response.data)
    .then(data => data.results)
    .then(keysToCamel)

export const getCoach = ({ id }: { id: number }) =>
  get<Coach, {}>(`${config.BACKEND_URL}/api/v1/web/coaches/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)

export interface RecommendationsParamsTypes {
  page: number
  page_size: number
}

export const getRecommendations = (params: RecommendationsParamsTypes) =>
  get<Pagination<Coach>, RecommendationsParamsTypes>(
    `${config.BACKEND_URL}/api/v1/web/clients/me/recommendations/`,
    params
  )
    .then(response => response.data)
    .then(keysToCamel)
