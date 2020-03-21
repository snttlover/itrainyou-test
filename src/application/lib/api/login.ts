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
  post<LoginResponse, LoginRequest>(`http://142.93.228.206:8006/api/v1/web/auth/login/`, data)
    .then(response => response.data)
    .then(keysToCamel)
