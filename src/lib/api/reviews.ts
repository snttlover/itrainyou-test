import { config } from "@/config"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { Client } from "@/lib/api/client/clientInfo"

export type ReviewClient = Client

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
  get<Pagination<CoachReviewResponse>>(`${config.BACKEND_URL}/api/v1/web/coaches/me/reviews/`)
    .then(response => response.data)
    .then(keysToCamel)
