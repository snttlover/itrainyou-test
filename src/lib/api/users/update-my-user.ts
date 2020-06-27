import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { patch } from "@/lib/network/network"

export type UpdateMyUserRequest = {
  email: string
  timeZone: string
}

export const updateMyUser = (data: UpdateMyUserRequest) =>
  patch(`${config.BACKEND_URL}/api/v1/web/users/me/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
