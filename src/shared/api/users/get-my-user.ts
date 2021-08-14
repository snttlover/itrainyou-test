import { ClientSelfData } from "@/lib/api/client/clientInfo"
import { CoachSelfData } from "@/lib/api/coach/get-my-coach"
import { createHttpRequestEffect } from "@/shared/api/common/create-http-request-effect"

export type GetMyUserResponse = {
  id: number
  client: ClientSelfData
  coach: CoachSelfData
  email: string
  phone: string
  timeZone: string
  creationDatetime: string
}

export const getMyUserApiFx = createHttpRequestEffect<void, GetMyUserResponse>({
  requestMapper: () => ({
    method: "GET",
    url: "/api/v1/web/users/me/"
  })
})
