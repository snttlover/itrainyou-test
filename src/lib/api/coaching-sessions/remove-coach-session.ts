import { config } from "@/config"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { Delete, post } from "@/lib/network/network"

export const removeCoachSession = (id: number | null) => Delete(`${config.BACKEND_URL}/api/v1/web/coach/sessions/${id}/`)

type RemoveCoachSessionRangeParams = {
  start_date: ISODate
  end_date: ISODate
}

export const removeCoachSessionRange = (params: RemoveCoachSessionRangeParams) =>
  post(`${config.BACKEND_URL}/api/v1/web/coach/sessions/clear-interval/`, params)
