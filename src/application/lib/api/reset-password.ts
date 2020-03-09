import { keysToCamel } from "@/application/lib/casing/casing"
import { post } from "@/application/lib/network/network"

type ResetPasswordResponse = void

export interface ResetPasswordRequest {
  token: string
  password: string
}

export const resetPassword = (data: ResetPasswordRequest) =>
  post<ResetPasswordResponse, ResetPasswordRequest>(
    `http://142.93.228.206:8006/api/v1/web/users/me/restore-password/`,
    data
  )
    .then(response => response.data)
    .then(keysToCamel)
