import { config } from "@/config"
import { CoachSchedule } from "@/lib/api/coaching-sessions/types"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export const getCoachSchedule = () =>
  get<CoachSchedule>(`${config.BACKEND_URL}/api/coach/coach-schedules/me/`)
    .then(response => response.data)
    .then(keysToCamel)
