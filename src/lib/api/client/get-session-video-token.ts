import { config } from "@/config"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface VideoTokenData {
  token: string
  channelName: string
  userAccount: string
  sessionTerminationDatetime: ISODate
  extraTimeMinutes: number
  interlocutorConnected: boolean
}

export const getClientSessionVideoToken = (id: number): Promise<VideoTokenData> =>
  get(`${config.BACKEND_URL}/api/v1/web/client/sessions/${id}/video-chat-token/`)
    .then(response => response.data)
    .then(keysToCamel)
