import { ClientSelfData } from "@/application/lib/api/client/client"
import { CoachSelfData } from "@/application/lib/api/coach/get-my-coach"
import { keysToCamel } from "@/application/lib/network/casing"
import { get } from "@/application/lib/network/network"

export type GetMyUserResponse = {
  id: number
  client: ClientSelfData
  coach: CoachSelfData
}

export const getMyUser = (): Promise<GetMyUserResponse> =>
  get(`${process.env.BACKEND_URL}/api/v1/web/users/me/`)
    .then(response => response.data)
    .then(keysToCamel)
