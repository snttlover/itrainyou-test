import { config } from "@/config"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface VideoTokenData {
  token: string
  channel_name: string
  user_account: string
  session_termination_datetime: ISODate
  extra_time_minutes: number
}

export const getCoachSessionVideoToken = (id: number): Promise<VideoTokenData> =>
  get(`${config.BACKEND_URL}/coach/sessions/${id}/video-chat-token/`)
    .then(response => response.data)
    .then(keysToCamel)
