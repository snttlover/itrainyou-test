import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

type StartTopUpWithSavedCardRequest = {
  id: number
  amount: number
}

type StartTopUpWithSavedCardResponse = {
  paymentId: string
  confirmationUrl: string
}

export const startTopUpWithCard = ({
  id,
  ...data
}: StartTopUpWithSavedCardRequest): Promise<StartTopUpWithSavedCardResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/client/cards/${id}/top-up-with-saved-card/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
