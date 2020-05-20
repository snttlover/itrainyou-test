import { Pagination } from "@/application/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export interface ReviewClient {
  id: number
  firstName: string
  lastName: string
  birthDate: string
  sex: "F" | "M"
  avatar: string
  creationDatetime: string
}

export interface ReviewCouch {
  id: number
  firstName: string
  lastName: string
  birthDate: string
  sex: "F" | "M"
  avatar: string
  isTopCoach: boolean
  creationDatetime: string
}

export interface CoachReviewResponse {
  id: number
  session: number
  grade: number
  text: string
  reviewedClient: ReviewClient | null
  reviewerClient: ReviewClient | null
  reviewedCoach: ReviewCouch | null
  reviewerCoach: ReviewCouch | null
  creationDatetime: string
}

export const getCoachReviews = ({ id }: { id: number }) =>
  get<Pagination<CoachReviewResponse>>(`${process.env.BACKEND_URL}/api/v1/web/coaches/${id}/reviews/`)
    .then(response => response.data)
    .then(keysToCamel)
