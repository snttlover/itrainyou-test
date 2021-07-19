import { config } from "@/config"
import { SessionCategory } from "@/lib/api/categories"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export interface RegisterAsUserRequest {
  email: string
  password: string
}

export interface RegisterAsUserResponse {
  token: string
}


export const registerAsUser = (data: RegisterAsUserRequest) =>
  post<RegisterAsUserResponse, RegisterAsUserRequest>(`${config.BACKEND_URL}/api/v1/web/auth/register/`, data)
    .then(response => response.data)
    .then(keysToCamel)


export interface RegisterAsClientRequest {
  firstName: string
  lastName: string
  phone: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  categories: number[]
  priceRanges: number[]
}

export interface RegisterAsClientResponse {
  user: {
    id: number
    email: string
    creationDatetime: string
  }
  phone: string
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
  middleName: string
  legalForm: "SELF_EMPLOYMENT" | "IP_PROFESSIONAL_TAXES" | "IP_OTHER_TAXES" | ""
  socialNetworks: string
  supervisions: string
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
  phone: string
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
