import { put } from "@/application/lib/network/network"
import { ClientInfo } from "@/application/lib/api/client/clientInfo"
import { Day, Sex } from "@/application/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"

export type UpdateClientRequest = {
  firstName: string,
  lastName: string,
  birthDate: Day,
  sex: Sex,
  avatar: null | string,
  categories: number[]
}

export const updateMyClient = (user: UpdateClientRequest) =>
  put<ClientInfo, UpdateClientRequest>(`${process.env.BACKEND_URL}/api/v1/web/clients/me/`, keysToSnake(user))
    .then(res => res.data)
    .then(keysToCamel)
