import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

type FinishSaveCardRequest = {
  paymentId: string
}

export const finishSaveCard = (data: FinishSaveCardRequest) =>
  post<void, FinishSaveCardRequest>(
    `${config.BACKEND_URL}/api/v1/web/coach/wallet/finish-save-card/`,
    keysToSnake(data)
  )
    .then(response => response.data)
    .then(keysToCamel)
