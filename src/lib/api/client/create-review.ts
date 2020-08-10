import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export type CreateReviewRequest = {
  session: number
  grade: number
  text: string
}

export const createClientReview = (data: CreateReviewRequest) =>
  post(`${config.BACKEND_URL}/api/v1/web/client/reviews/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
