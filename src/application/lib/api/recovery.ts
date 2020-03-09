import { keysToCamel } from "@/application/lib/casing/casing"
import { post } from "@/application/lib/network/network"

type RecoveryResponse = void

export interface RecoveryRequest {
  email: string
}

export const recovery = (data: RecoveryRequest) =>
  post<RecoveryResponse, RecoveryRequest>(`http://142.93.228.206:8006/api/v1/web/users/me/request-password-restore/`, data)
    .then(response => response.data)
    .then(keysToCamel)
