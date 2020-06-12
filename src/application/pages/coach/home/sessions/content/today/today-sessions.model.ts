import {$todayCoachSessions} from "../../coach-sessions-page.model"
import dayjs from "dayjs"

export const $todaySessionsList = $todayCoachSessions.map(sessions => sessions.map(session => {
  const client = session.clients[0]
  return {
    avatar: client.avatar,
    name: `${client.firstName} ${client.lastName}`,
    duration: `${session.durationType.slice(1, session.durationType.length)} мин`,
    time: dayjs(session.startDatetime).format(`HH:mm`)
  }
}))

export const $hasTodaySessions = $todaySessionsList.map(sessions => !!sessions.length)