import { keysToCamel } from "@/application/lib/casing/casing"
import { get } from "@/application/lib/network/network"

export interface Coach {
  id: number
  user: {
    id: number
    email: string
    creationDatetime: string
  }
  firstName: string
  lastName: string
  birthDate: string
  sex: "M" | "F"
  avatar: string
  isApproved: string
  isTopCoach: string
  photos: string[]
  description: string
  workExpirience: string
  education: string
  categories: {
    id: number
    name: string
    icon: string
    description: string
  }[]
  rating: number
  reviewsCount: number
  creationDatetime: string
}

interface Pagination<T> {
  count: number
  next: number
  previous: number
  results: T[]
}

export type CoachSortingType = `price` | `-price` | `popularity` | `-popularity`

export interface GetCoachesParamsTypes {
  price__lte?: number
  price__gte?: number
  price?: number
  is_top_coach?: boolean
  categories?: string // id,id,id
  rating?: number
  rating__gte?: number
  search?: string
  nearest_session_date__gte?: string // YYYY-MM-DD
  nearest_session_date__lte?: string
  sorting?: CoachSortingType
}

export const getCoaches = (params: GetCoachesParamsTypes) =>
  get<Pagination<Coach>, GetCoachesParamsTypes>("http://142.93.228.206:8006/api/v1/web/coaches/", params)
    .then(response => response.data)
    .then(data => data.results)
    .then(keysToCamel)
