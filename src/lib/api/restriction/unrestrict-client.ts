import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

export const unrestrictClient = (id: number) =>
  post(`${config.BACKEND_URL}/api/v1/web/clients/${id}/unrestrict/`)
    .then(response => response.data)
    .then(keysToCamel)
