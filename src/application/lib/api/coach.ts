import { Pagination } from "@/application/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface Coach {
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
  firstName: string
  lastName: string
  birthDate: string
  sex: "M" | "F"
  avatar: string
  isApproved: string
  isTopCoach: boolean
  photos: string[]
  description: string
  workExperience: string
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
  nearestSessionDatetime: string
}

export type CoachSortingType = `price` | `-price` | `popularity` | `-popularity`

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
  get<Pagination<Coach>, GetCoachesParamsTypes>("https://dev.itrainyou.heksray.com/api/v1/web/coaches/", params)
    .then(response => response.data)
    .then(data => data.results)
    .then(keysToCamel)

export const getCoach = ({ id }: { id: number }) =>
  get<Coach, {}>(`https://dev.itrainyou.heksray.com/api/v1/web/coaches/${id}/`)
    .then(response => response.data)
    .then(keysToCamel)
