import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"
import { patch } from "@/application/lib/network/network"

export type UpdateMyUserRequest = {
  email: string
  timeZone: string
}

export const updateMyUser = (data: UpdateMyUserRequest) =>
  patch(`${process.env.BACKEND_URL}/api/v1/web/coaches/me/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
