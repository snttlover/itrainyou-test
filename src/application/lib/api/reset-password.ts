import { keysToCamel } from "@/application/lib/network/casing"
import { post } from "@/application/lib/network/network"

type ResetPasswordResponse = void

export interface ResetPasswordRequest {
  token: string
  password: string
}

export const resetPassword = (data: ResetPasswordRequest) =>
  post<ResetPasswordResponse, ResetPasswordRequest>(
    `${process.env.BACKEND_URL}/api/v1/web/users/me/restore-password/`,
    data
  )
    .then(response => response.data)
    .then(keysToCamel)
