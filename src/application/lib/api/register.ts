import { Category } from "@/application/lib/api/categories"
import { keysToCamel, keysToSnake } from "@/application/lib/network/casing"
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
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
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
  birthDate: string  | null
  sex: "M" | "F" | ""
  avatar: string | null
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

export interface RegisterAsCouchRequest {
  firstName: string
  lastName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  categories: number[]
  workExperience: string
  education: string
  description: string
  phone: string
  videoInterview: string
}

export interface RegisterAsCouchResponse {
  user: {
    id: number,
    email: string,
    creationDatetime: string
  }
  firstName: string
  lastName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  categories: Category[]
  favouriteCoaches: []
  creationDatetime: string
}

export const registerAsCouch = (data: RegisterAsCouchRequest) =>
  post<RegisterAsCouchResponse, RegisterAsCouchRequest>(
    `https://dev.itrainyou.heksray.com/api/v1/web/coaches/`,
    keysToSnake(data)
  )
    .then(response => response.data)
    .then(keysToCamel)
