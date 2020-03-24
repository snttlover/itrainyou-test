import { Category } from "@app/lib/api/categories"
import { keysToCamel, keysToSnake } from "@app/lib/network/casing"
import { post } from "@/application/lib/network/network"

export interface RegisterAsUserRequest {
  email: string
  password: string
}

export interface RegisterAsUserResponse {
  token: string
}

export const registerAsUser = (data: RegisterAsUserRequest) =>
  post<RegisterAsUserResponse, RegisterAsUserRequest>(
    `https://dev.itrainyou.heksray.com/api/v1/web/auth/register/`,
    data
  )
    .then(response => response.data)
    .then(keysToCamel)

export interface RegisterAsClientRequest {
  firstName: string
  lastName: string
  birthDate: string
  sex: "M" | "F"
  avatar: string
  categories: number[]
}

export interface RegisterAsClientResponse {
  user: {
    id: number,
    email: string,
    creationDatetime: string
  }
  firstName: string
  lastName: string
  birthDate: string
  sex: "M" | "F"
  avatar: string
  categories: Category[]
  favouriteCoaches: []
  creationDatetime: string
}

export const registerAsClient = (data: RegisterAsClientRequest) =>
  post<RegisterAsClientResponse, RegisterAsClientRequest>(
    `https://dev.itrainyou.heksray.com/api/v1/web/clients/`,
    keysToSnake(data)
  )
    .then(response => response.data)
    .then(keysToCamel)
