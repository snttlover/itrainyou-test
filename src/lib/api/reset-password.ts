import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

type ResetPasswordResponse = void

export interface ResetPasswordRequest {
  token: string
  password: string
}

export const resetPassword = (data: ResetPasswordRequest) =>
  post<ResetPasswordResponse, ResetPasswordRequest>(`${config.BACKEND_URL}/api/v1/web/users/me/restore-password/`, data)
    .then(response => response.data)
    .then(keysToCamel)
