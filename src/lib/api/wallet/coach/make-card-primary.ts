import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"


export type MakeCardPrimaryResponse = void

export const makeCardPrimary = (id: number): Promise<MakeCardPrimaryResponse> =>
  post(`${config.BACKEND_URL}/api/v1/web/coach/cards/${id}/make-primary/`)
    .then(response => response.data)
    .then(keysToCamel)