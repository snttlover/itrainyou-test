import { config } from "@/config"
import { DurationType } from "@/lib/api/coach-sessions"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export interface CreateSessionRequest {
  startDatetime: ISODate
  durationType: DurationType
}

export const createSession = (data: CreateSessionRequest) =>
  post(`${config.BACKEND_URL}/api/v1/web/coach/sessions/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
