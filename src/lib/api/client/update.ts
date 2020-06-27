import { config } from "@/config"
import { put } from "@/lib/network/network"
import { ClientInfo } from "@/lib/api/client/clientInfo"
import { Day, Sex } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"

export type UpdateClientRequest = {
  firstName: string
  lastName: string
  birthDate: Day
  sex: Sex
  avatar: null | string
  categories: number[]
}

export const updateMyClient = (user: UpdateClientRequest) =>
  put<ClientInfo, UpdateClientRequest>(`${config.BACKEND_URL}/api/v1/web/clients/me/`, keysToSnake(user))
    .then(res => res.data)
    .then(keysToCamel)
