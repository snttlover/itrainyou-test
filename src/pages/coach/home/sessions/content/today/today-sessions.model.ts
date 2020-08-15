import { date } from "@/lib/formatting/date"
import { $todayCoachSessions } from "../../coach-sessions-page.model"

export const $todaySessionsList = $todayCoachSessions.map(sessions =>
  sessions.map(session => {
    const client = session.clients[0]
    return {
      link: `/coach/sessions/${session.id}`,
      avatar: client.avatar,
      name: `${client.firstName} ${client.lastName}`,
      duration: `${session.durationType.slice(1, session.durationType.length)} мин`,
      time: date(session.startDatetime).format(`HH:mm`),
    }
  })
)

export const $hasTodaySessions = $todaySessionsList.map(sessions => !!sessions.length)
