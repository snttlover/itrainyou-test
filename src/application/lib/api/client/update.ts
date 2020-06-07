import { put } from "@/application/lib/network/network"
import { Client } from "@/application/lib/api/client/client"
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
  put<Client, UpdateClientRequest>(`${process.env.BACKEND_URL}/api/v1/web/clients/me/`, keysToSnake(user))
    .then(keysToCamel)
