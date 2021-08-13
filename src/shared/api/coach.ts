import { createHttpRequestEffect } from "@/shared/api/common/create-http-request-effect"
import { Pagination, Sex } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"

type CoachCategoryListItemType = {
  id: number
  name: string
  icon: string
  description: string
}

export type CoachUser = {
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
    PROMO: null | number
  }
  duration: string
  isFavourite: boolean
  isApproved: string
  photos: string[]
  description: string
  workExperience: string
  education: string
  rating: number
  reviewsCount: number
  nearestSessionDatetime: string
} & CoachUser

export type CoachSortingType = "price" | "-price" | "popularity" | "nearest_session_datetime"

export type GetCoachesParamsTypes = {
  session_duration_types?: string
  promo_and_paid_sessions?: boolean
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

export const getCoachesApiFx = createHttpRequestEffect<GetCoachesParamsTypes, Pagination<Coach>>({
  requestMapper: (query) => ({
    url: "/api/v1/web/coaches/",
    method: "GET",
    query: keysToSnake(query)
  }),
})
