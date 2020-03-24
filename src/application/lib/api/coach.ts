import { Pagination } from "@app/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@app/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface Coach {
  id: number
  user: {
    id: number
    email: string
    creationDatetime: string
  }
  price: string
  duration: string
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
  nearestSessionDatetime: string
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
  ordering?: CoachSortingType
}

export const getCoaches = (params: GetCoachesParamsTypes) =>
  get<Pagination<Coach>, GetCoachesParamsTypes>("https://dev.itrainyou.heksray.com/api/v1/web/coaches/", params)
    .then(response => response.data)
    .then(data => data.results)
    .then(keysToCamel)
