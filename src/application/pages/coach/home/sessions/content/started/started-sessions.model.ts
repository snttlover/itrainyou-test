import { $activeCoachSessions } from "@/application/pages/coach/home/sessions/coach-sessions-page.model"
import dayjs from "dayjs"

export const $startedSessionsList = $activeCoachSessions.map(sessions => sessions.map(session => {
  const client = session.clients[0]
  return {
    avatar: client.avatar,
    name: `${client.firstName} ${client.lastName}`,
    duration: `${session.durationType.slice(1, session.durationType.length)} мин`,
    time: dayjs(session.startDatetime).format(`HH:mm`),
    isActive: true
  }
}))

export const $hasStartedSessions = $startedSessionsList.map(sessions => !!sessions.length)
