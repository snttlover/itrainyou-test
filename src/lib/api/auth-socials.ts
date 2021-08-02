import { post } from "@/lib/network/network"
import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { ClientSelfData, User } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"

export type CheckEmailRequest = {
  email: string
}

export type CheckEmailResponse = {
  isReserved: boolean
}

export type CheckPhoneRequest = {
  phone: string
}

export type CheckPhoneResponse = {
  isReserved: boolean
}

export type SocialsDataFound = User & {
  coach: null | CoachSelfData
  client: null | ClientSelfData
}

export interface RegisterAsUserFromSocialsResponseFound {
  status: string
  data: {
    token: string
    user: SocialsDataFound
  }
}

export type SocialsDataNotFound = {
  email: string | null
  firstName: string
  lastName: string
  middleName: string
  sex: "M" | "F" | ""
  birthDate: string | null
  avatar: string | null
  originalAvatar: string | null
}

export interface RegisterAsUserFromSocialsResponseNotFound {
  status: string
  data: SocialsDataNotFound
}

export interface CreateUserWithSocialsResponse {
  token: string
  user: User & {
    coach: null | CoachSelfData
    client: null | ClientSelfData
  }
}

export interface RegisterWithSocialsRequest {
  accessToken: string
}

export interface CreateUserWithSocialsRequest {
  accessToken: string
  email: string
  phone: string
  socialNetwork: string | null
}

export type RegisterAsUserFromSocialsResponse = RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound

export const AuthWithVK = (accessToken: RegisterWithSocialsRequest): Promise<RegisterAsUserFromSocialsResponse> =>
  post<RegisterAsUserFromSocialsResponse, RegisterWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/vk/`,
    keysToSnake(accessToken))
    .then(response => response.data)
    .then(keysToCamel)

export const AuthWithFB = (accessToken: RegisterWithSocialsRequest): Promise<RegisterAsUserFromSocialsResponse> =>
  post<RegisterAsUserFromSocialsResponse, RegisterWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/facebook/`,
    keysToSnake(accessToken))
    .then(response => response.data)
    .then(keysToCamel)

export const AuthWithGoogle = (accessToken: RegisterWithSocialsRequest): Promise<RegisterAsUserFromSocialsResponse> =>
  post<RegisterAsUserFromSocialsResponse, RegisterWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/google/`,
    keysToSnake(accessToken))
    .then(response => response.data)
    .then(keysToCamel)

export const createUserFromSocials = (data: CreateUserWithSocialsRequest): Promise<CreateUserWithSocialsResponse> =>
  post<CreateUserWithSocialsResponse, CreateUserWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/create-user-from-social/`,
    keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)

export const checkEmail = (data: CheckEmailRequest): Promise<CheckEmailResponse> =>
  post<CheckEmailResponse, CheckEmailRequest>(`${config.BACKEND_URL}/api/v1/web/auth/check-email/`,
    keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)

export const checkPhone = (data: CheckPhoneRequest): Promise<CheckPhoneResponse> =>
  post<CheckPhoneResponse, CheckPhoneRequest>(`${config.BACKEND_URL}/api/v1/web/auth/check-phone/`,
    keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)