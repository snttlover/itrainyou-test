import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

type FinishTopUpRequest = {
  paymentId: string
}

export const finishTopUp = (data: FinishTopUpRequest): Promise<void> =>
  post(`${config.BACKEND_URL}/api/v1/web/client/wallet/finish-top-up/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
