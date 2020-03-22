import { keysToCamel } from "@app/lib/network/casing"
import { post } from "@/application/lib/network/network"

export interface LoginResponse {
  token: string
  user: {
    id: number
    email: string
    creationDatetime: string
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export const login = (data: LoginRequest) =>
  post<LoginResponse, LoginRequest>(`https://dev.itrainyou.heksray.com/api/v1/web/auth/login/`, data)
    .then(response => response.data)
    .then(keysToCamel)
