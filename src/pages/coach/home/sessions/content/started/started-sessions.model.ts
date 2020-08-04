import { date } from "@/lib/formatting/date"
import { $activeCoachSessions } from "@/pages/coach/home/sessions/coach-sessions-page.model"

export const $startedSessionsList = $activeCoachSessions.map(sessions =>
  sessions.map(session => {
    const client = session.clients[0]
    return {
      link: `/coach/sessions/${session.id}`,
      avatar: client.avatar,
      name: `${client.firstName} ${client.lastName}`,
      duration: `${session.durationType.slice(1, session.durationType.length)} мин`,
      time: date(session.startDatetime).format(`HH:mm`),
      isActive: true,
    }
  })
)

export const $hasStartedSessions = $startedSessionsList.map(sessions => !!sessions.length)
