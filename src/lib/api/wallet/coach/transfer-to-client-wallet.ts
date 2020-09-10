import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

type TransferToClientWalletRequest = {
  amount: number
}

export const transferToClientWallet = (data: TransferToClientWalletRequest) =>
  post(`${config.BACKEND_URL}/api/v1/web/coach/wallet/transfer-to-client-wallet/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
