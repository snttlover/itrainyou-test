import { post } from "@/lib/network/network"
import { config } from "@/config"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { SocialsDataFound, SocialsDataNotFound } from "@/pages/auth/pages/signup/signup.model"
import { User } from "@/lib/api/client/clientInfo"


export interface RegisterAsUserFromSocialsResponseFound {
  status: string
  data: {
    token: string
    user: SocialsDataFound
  }
}

export interface RegisterAsUserFromSocialsResponseNotFound {
  status: string
  data: SocialsDataNotFound
}

export interface CreateUserWithSocialsResponse {
  token: string
  user: User & {
    coach: string | null
    client: string | null
  }
}

export interface RegisterWithSocialsRequest {
  accessToken: string
}

export interface CreateUserWithSocialsRequest {
  accessToken: string
  email: string
  socialNetwork: string | null
}

export const AuthWithVK = (accessToken: RegisterWithSocialsRequest): Promise<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound> =>
  post<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound, RegisterWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/vk/`,
    keysToSnake(accessToken))
    .then(response => response.data)
    .then(keysToCamel)

export const AuthWithFB = (accessToken: RegisterWithSocialsRequest): Promise<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound> =>
  post<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound, RegisterWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/facebook/`,
    keysToSnake(accessToken))
    .then(response => response.data)
    .then(keysToCamel)


export const createUserFromSocials = (data: CreateUserWithSocialsRequest): Promise<CreateUserWithSocialsResponse> =>
  post<CreateUserWithSocialsResponse, CreateUserWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/create-user-from-social/`,
    keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)