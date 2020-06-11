import { ClientSelfData } from "@/application/lib/api/client/clientInfo"
import { CoachSelfData } from "@/application/lib/api/coach/get-my-coach"
import { ISODate } from "@/application/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/application/lib/network/casing"
import { post } from "@/application/lib/network/network"

export interface UserSelfData {
  id: number
  email: string
  creationDatetime: ISODate
  timeZone: string
}

export interface LoginResponse {
  token: string
  user: UserSelfData & {
    coach: null | CoachSelfData
    client: null | ClientSelfData
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export const login = (data: LoginRequest): Promise<LoginResponse> =>
  post<LoginResponse, LoginRequest>(`${process.env.BACKEND_URL}/api/v1/web/auth/login/`, data)
    .then(response => response.data)
    .then(keysToCamel)
