import { config } from "@/config"
import { post } from "@/lib/network/network"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"

export type CheckPhoneRequest = {
  phone: string
}

export type CheckPhoneResponse = {
  isReserved: boolean
}

export const checkPhone = (data: CheckPhoneRequest): Promise<CheckPhoneResponse> =>
  post<CheckPhoneResponse, CheckPhoneRequest>(`${config.BACKEND_URL}/api/v1/web/auth/check-phone/`,
    keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)