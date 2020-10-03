import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

export type RecoveryResponse = void

export interface RecoveryRequest {
  email: string
}

export const recovery = (data: RecoveryRequest) =>
  post<RecoveryResponse, RecoveryRequest>(`${config.BACKEND_URL}/api/v1/web/users/me/request-password-restore/`, data)
    .then(response => response.data)
    .then(keysToCamel)
