import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

type StartTopUpParams = {
  amount: number
  saveCard?: boolean
}

type StartTopUpResponse = {
  paymentId: string
  confirmationUrl: string
}

export const startTopUp = (params: StartTopUpParams): Promise<StartTopUpResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/client/wallet/start-top-up/`, keysToSnake(params))
    .then(response => response.data)
    .then(keysToCamel)
