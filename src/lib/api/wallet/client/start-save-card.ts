import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export type StartSaveCardParams = {
  returnUrl: string
}

export type StartSaveCardResponse = {
  paymentId: string
  confirmationUrl: string
}

export const startSaveCard = (params: StartSaveCardParams): Promise<StartSaveCardResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/client/wallet/start-save-card/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)