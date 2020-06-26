import { config } from "@/config"
import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { keysToCamel } from "@/lib/network/casing"
import { authorizedRequestFx } from "@/lib/network/network"
import { AxiosResponse } from "axios"
import { attach, Effect } from "effector"

export type GetMyUserResponse = {
  id: number
  client: ClientSelfData
  coach: CoachSelfData
  email: string
  timeZone: string
  creationDatetime: string
}

export const getMyUserFx = attach<never, Effect<any, AxiosResponse<GetMyUserResponse>>>({
  effect: authorizedRequestFx,
  mapParams: () => ({ method: "get", url: `${config.BACKEND_URL}/api/v1/web/users/me/` }),
})
