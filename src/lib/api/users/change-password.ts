import { config } from "#/config"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

export type ChangePasswordResponse = {
  token: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export const changePassword = (data: ChangePasswordRequest) =>
  post<ChangePasswordResponse, ChangePasswordRequest>(
    `${config.BACKEND_URL}/api/v1/web/users/me/change-password/`,
    keysToSnake(data)
  )
    .then(response => response.data)
    .then(keysToCamel)
