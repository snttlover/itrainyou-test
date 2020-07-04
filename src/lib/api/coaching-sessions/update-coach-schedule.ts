import { config } from "@/config"
import { CoachSchedule, UpdateCoachSchedule } from "@/lib/api/coaching-sessions/types"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { put } from "@/lib/network/network"

export const updateCoachSchedule = (data: UpdateCoachSchedule) =>
  put<CoachSchedule, UpdateCoachSchedule>(
    `${config.BACKEND_URL}/api/v1/web/coach/coach-schedules/me/`,
    keysToSnake(data)
  )
    .then(res => res.data)
    .then(keysToCamel)
