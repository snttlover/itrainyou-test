import { keysToCamel } from "@app/lib/network/casing"
import { post } from "@/application/lib/network/network"

export interface RegisterAsUserRequest {
  email: string
  password: string
}

export interface RegisterAsUserResponse {
  token: string
}

export const registerAsUser = async (data: RegisterAsUserRequest) =>
  post<RegisterAsUserResponse, RegisterAsUserRequest>(`https://dev.itrainyou.heksray.com/api/v1/web/auth/register/`, data)
    .then(response => response.data)
    .then(keysToCamel)
