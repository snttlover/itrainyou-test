import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export type StartSaveCoachCardParams = {
    returnUrl: string
}

export type StartSaveCoachCardResponse = {
  paymentId: string
  confirmationUrl: string
}

export const startSaveCoachCard = (params: StartSaveCoachCardParams): Promise<StartSaveCoachCardResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/coach/wallet/start-save-card/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
