import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"
import { post } from "@/application/lib/network/network"

export type ChangePasswordResponse = {
  token: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export const changePassword = (data: ChangePasswordRequest) =>
  post<ChangePasswordResponse, ChangePasswordRequest>(
    `${process.env.BACKEND_URL}/api/v1/web/users/me/change-password/`,
    keysToSnake(data)
  )
    .then(response => response.data)
    .then(keysToCamel)
