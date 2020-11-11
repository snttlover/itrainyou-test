import { config } from "@/config"
import { SessionCategory } from "@/lib/api/categories"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"
import { UserData, SocialsDataFound, SocialsDataNotFound  } from "@/pages/auth/pages/signup/signup.model"
import { User } from "@/lib/api/client/clientInfo"

export interface RegisterAsUserRequest {
  email: string
  password: string
}

export interface RegisterAsUserResponse {
  token: string
}


export interface RegisterWithSocialsRequest {
  access_token: string
}

export interface CreateUserWithSocialsRequest {
  accessToken: string
  email: string
  socialNetwork: string | null
}

export interface CreateUserWithSocialsResponse {
  token: string
  user: User & {
    coach: string | null
    client: string | null
  }
}

export interface RegisterAsUserFromSocialsResponseNotFound {
  status: string
  data: SocialsDataNotFound
}

export interface RegisterAsUserFromSocialsResponseFound {
  status: string
  data: {
    token : string
    user : SocialsDataFound
  }
}

export const registerAsUser = (data: RegisterAsUserRequest) =>
  post<RegisterAsUserResponse, RegisterAsUserRequest>(`${config.BACKEND_URL}/api/v1/web/auth/register/`, data)
    .then(response => response.data)
    .then(keysToCamel)

export const registerAsUserFromFacebook = (accessToken: RegisterWithSocialsRequest): Promise<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound> =>
  post<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound, RegisterWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/facebook/`, accessToken)
    .then(response => response.data)
    .then(keysToCamel)

export const registerAsUserFromVk = (accessToken: RegisterWithSocialsRequest): Promise<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound> =>
  post<RegisterAsUserFromSocialsResponseNotFound | RegisterAsUserFromSocialsResponseFound, RegisterWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/vk/`, accessToken)
    .then(response => response.data)
    .then(keysToCamel)

export const createrUserFromSocials = (data: CreateUserWithSocialsRequest): Promise<CreateUserWithSocialsResponse> =>
  post<CreateUserWithSocialsResponse, CreateUserWithSocialsRequest>(`${config.BACKEND_URL}/api/v1/web/auth/create-user-from-social/`,
     keysToSnake(data))
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
    id: number
    email: string
    creationDatetime: string
  }
  firstName: string
  lastName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  categories: SessionCategory[]
  favouriteCoaches: []
  creationDatetime: string
}

export const registerAsClient = (data: RegisterAsClientRequest): Promise<RegisterAsClientResponse> =>
  post<RegisterAsClientResponse, RegisterAsClientRequest>(
    `${config.BACKEND_URL}/api/v1/web/clients/`,
    keysToSnake(data)
  )
    .then(response => response.data)
    .then(keysToCamel)

export interface RegisterAsCoachRequest {
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

export interface RegisterAsCoachResponse {
  user: {
    id: number
    email: string
    creationDatetime: string
  }
  firstName: string
  lastName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  categories: SessionCategory[]
  favouriteCoaches: []
  creationDatetime: string
}

export const registerAsCoach = (data: RegisterAsCoachRequest): Promise<RegisterAsCoachResponse> =>
  post<RegisterAsCoachResponse, RegisterAsCoachRequest>(`${config.BACKEND_URL}/api/v1/web/coaches/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
