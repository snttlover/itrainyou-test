import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { post } from "@/lib/network/network"
import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { createHttpRequestEffect } from "@/shared/api/common/create-http-request-effect"

export type UserSelfData = {
  id: number
  email: string
  phone: string
  creationDatetime: ISODate
  timeZone: string
}

export type LoginResponse = {
  token: string
  user: UserSelfData & {
    coach: null | CoachSelfData
    client: null | ClientSelfData
  }
}

export type LoginRequest = {
  email: string
  password: string
}

export const login = (data: LoginRequest): Promise<LoginResponse> =>
  post<LoginResponse, LoginRequest>(`${config.BACKEND_URL}/api/v1/web/auth/login/`, data)
    .then(response => response.data)
    .then(keysToCamel)


export const loginApiFx = createHttpRequestEffect<LoginRequest, LoginResponse>({
  requestMapper: (data) => ({
    url: "/api/v1/web/auth/login/",
    method: "POST",
    body: data
  })
})
