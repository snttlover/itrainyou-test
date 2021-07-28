import { $activeCoachSessions } from "@/pages/coach/home/sessions/coach-sessions-page.model"

export const $startedSessionsList = $activeCoachSessions.map(sessions => {
  return sessions.map(session => {
    const client = session.clients[0]
    return {
      id: session.id,
      aboutLink: `/coach/sessions/${session.id}`,
      avatar: client.avatar,
      name: `${client.firstName} ${client.lastName}`,
      startDatetime: session.startDatetime,
      endDatetime: session.startDatetime,
    }
  })
})

export const $hasStartedSessions = $startedSessionsList.map(sessions => !!sessions.length)
