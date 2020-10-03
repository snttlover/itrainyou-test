import { post } from "#/lib/network/network"
import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"

export const unBanClient = (id: number) =>
  post(`${config.BACKEND_URL}/api/v1/web/clients/${id}/unban/`)
    .then(response => response.data)
    .then(keysToCamel)
