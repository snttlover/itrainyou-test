import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

export const banClient = (id: number) =>
  post(`${config.BACKEND_URL}/api/v1/web/clients/${id}/ban/`)
    .then(response => response.data)
    .then(keysToCamel)
