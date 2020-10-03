import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

type WithdrawMoneyRequest = {
  amount: number
  card: number
}

export const withdrawMoney = (data: WithdrawMoneyRequest) =>
  post(`${config.BACKEND_URL}/api/v1/web/coach/wallet/withdraw/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
