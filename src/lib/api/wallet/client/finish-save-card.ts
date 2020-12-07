import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export type FinishSaveCardRequest = {
  paymentId: string
}

export type FinishSaveCardResponse = void

export const finishSaveCard = (params: FinishSaveCardRequest): Promise<FinishSaveCardResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/client/wallet/finish-save-card/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)