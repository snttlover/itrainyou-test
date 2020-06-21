import { config } from "@/config"
import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export type GetMyUserResponse = {
  id: number
  client: ClientSelfData
  coach: CoachSelfData
  email: string
  timeZone: string
  creationDatetime: string
}

export const getMyUser = (): Promise<GetMyUserResponse> =>
  get(`${config.BACKEND_URL}/api/v1/web/users/me/`)
    .then(response => response.data)
    .then(keysToCamel)
