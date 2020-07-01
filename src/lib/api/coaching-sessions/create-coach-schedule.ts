import { config } from "@/config"
import { CoachSchedule, CreateCoachSchedule } from "@/lib/api/coaching-sessions/types"
import { keysToCamel, keysToSnake } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export const createCoachSchedule = (data: CreateCoachSchedule) =>
  post<CoachSchedule, CreateCoachSchedule>(`${config.BACKEND_URL}/api/coach/coach-schedules/`, keysToSnake(data))
    .then(res => res.data)
    .then(keysToCamel)
