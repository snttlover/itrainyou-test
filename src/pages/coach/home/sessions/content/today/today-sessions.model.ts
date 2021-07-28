import { $todayCoachSessions } from "../../coach-sessions-page.model"

export const $todaySessionsList = $todayCoachSessions.map(sessions => {
  return sessions.map(session => {
    const client = session.clients[0]
    return {
      id: session.id,
      aboutLink: `/coach/sessions/${session.id}`,
      avatar: client.avatar,
      name: `${client.firstName} ${client.lastName}`,
      startDatetime: session.startDatetime,
      endDatetime: session.endDatetime,
    }
  })
})

export const $hasTodaySessions = $todaySessionsList.map(sessions => !!sessions.length)
