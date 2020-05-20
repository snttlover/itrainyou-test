import { keysToCamel } from "@/application/lib/network/casing"
import { post } from "@/application/lib/network/network"

export type RecoveryResponse = void

export interface RecoveryRequest {
  email: string
}

export const recovery = (data: RecoveryRequest) =>
  post<RecoveryResponse, RecoveryRequest>(
    `${process.env.BACKEND_URL}/api/v1/web/users/me/request-password-restore/`,
    data
  )
    .then(response => response.data)
    .then(keysToCamel)
