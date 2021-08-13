import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { ClientSelfData } from "@/lib/api/client/clientInfo"
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

export const loginApiFx = createHttpRequestEffect<LoginRequest, LoginResponse>({
  requestMapper: (data) => ({
    url: "/api/v1/web/auth/login/",
    method: "POST",
    body: data
  })
})
