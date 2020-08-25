import { date } from "@/lib/formatting/date"
import * as React from "react"
import { $todayCoachSessions } from "../../coach-sessions-page.model"

export const $todaySessionsList = $todayCoachSessions.map(sessions => {
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
    }
  })
})

export const $hasTodaySessions = $todaySessionsList.map(sessions => !!sessions.length)
