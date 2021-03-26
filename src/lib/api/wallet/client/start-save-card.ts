import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export type StartSaveClientCardParams = {
  returnUrl: string
  coach?: number
}

type StartSaveClientCardResponse = {
  paymentId: string
  confirmationUrl: string
}

export const startSaveClientCard = (params: StartSaveClientCardParams): Promise<StartSaveClientCardResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/client/wallet/start-save-card/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)