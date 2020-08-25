import { date } from "@/lib/formatting/date"
import { $activeCoachSessions } from "@/pages/coach/home/sessions/coach-sessions-page.model"

export const $startedSessionsList = $activeCoachSessions.map(sessions => {
  const now = date()
  return sessions.map(session => {
    const client = session.clients[0]
    const startDate = date(session.startDatetime)
    const endDate = date(session.endDatetime)
    const isStartIsNowDay = now.isSame(startDate, "d")
    return {
      link: `/coach/sessions/${session.id}`,
      avatar: client.avatar,
      name: `${client.firstName} ${client.lastName}`,
      duration: `${session.durationType.slice(1, session.durationType.length)} мин`,
      time: `${startDate.format(isStartIsNowDay ? "Сегодня HH:mm" : "DD MMMM HH:mm")}-${endDate.format("HH:mm")}`,
      isActive: true,
    }
  })
})

export const $hasStartedSessions = $startedSessionsList.map(sessions => !!sessions.length)
