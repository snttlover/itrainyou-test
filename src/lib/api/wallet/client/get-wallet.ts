import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { get } from "#/lib/network/network"

export type WalletResponse = {
  id: number
  client: number
  coach: number | null
  amount: string
  frozenAmount: string
  totalAmount: string
}

export const getWallet = () =>
  get<WalletResponse>(`${config.BACKEND_URL}/api/v1/web/client/wallet/`)
    .then(response => response.data)
    .then(keysToCamel)
