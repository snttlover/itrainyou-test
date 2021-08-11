import { config } from "@/config"
import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export interface UserSelfData {
  id: number
  email: string
  phone: string
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
  post<LoginResponse, LoginRequest>(`${config.BACKEND_URL}/api/v1/web/auth/login/`, data)
    .then(response => response.data)
    .then(keysToCamel)
