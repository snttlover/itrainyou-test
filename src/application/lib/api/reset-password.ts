import { keysToCamel } from "@app/lib/network/casing"
import { post } from "@/application/lib/network/network"

type ResetPasswordResponse = void

export interface ResetPasswordRequest {
  token: string
  password: string
}

export const resetPassword = (data: ResetPasswordRequest) =>
  post<ResetPasswordResponse, ResetPasswordRequest>(
    `https://dev.itrainyou.heksray.com/api/v1/web/users/me/restore-password/`,
    data
  )
    .then(response => response.data)
    .then(keysToCamel)
