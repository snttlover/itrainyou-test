import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

type StartSaveCardResponse = {
  paymentId: string
  confirmationUrl: string
}

export const startSaveCard = (): Promise<StartSaveCardResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/coach/wallet/start-save-card/`)
    .then(response => response.data)
    .then(keysToCamel)
