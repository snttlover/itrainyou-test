import { config as globalConfig, config as appConfig } from "@/config"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { createEffect, createEvent, forward, restore, combine } from "effector-root"
import { date } from "@/lib/formatting/date"
import { createSessionCallModule } from "@/oldcomponents/layouts/behaviors/dashboards/call/create-session-call.model"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { Client } from "@/lib/api/client/clientInfo"

type CreateStartSessionToolbarModelConfig = {
  type: "coach" | "client"
  fetchSessions: () => Promise<DashboardSession[]>
  socket: ReturnType<typeof createChatsSocket>
  sessionCallModule: ReturnType<typeof createSessionCallModule>
}

const formatDates = (start: ISODate, end: ISODate) => {
  return `${date(start).format("HH:mm")} - ${date(end).format("HH:mm")}`
}

const isBeginningIsComingSoon = (session: DashboardSession) =>
  date().isBetween(date(session.startDatetime).subtract(5, "minute"), date(session.endDatetime).add(10, "minute"))

const isStartedSession = (session: DashboardSession) =>
  date().isBetween(date(session.startDatetime).toDate(), date(session.endDatetime).toDate())

export const createStartSessionToolbarModel = (config: CreateStartSessionToolbarModelConfig) => {
  const reset = createEvent()
  const loadSessionsFx = createEffect({
    handler: config.fetchSessions,
  })
  const load = createEvent()

  const changeSessionsList = createEvent<DashboardSession[]>()
  const $sessionsList = restore(changeSessionsList, [])
    .on(config.socket.events.onSessionStarted, (sessions, message) => [...sessions, message.data])
    .reset(reset)

  const $lastCallId = restore(config.sessionCallModule.methods.connectToSession, 0).reset(
    config.sessionCallModule.methods.close
  )

  const $sessions = combine($sessionsList, $lastCallId, (sessions, currentSessionCall) => {
    return sessions
      .filter(session => session.id !== currentSessionCall)
      .map(session => {
        const user = config.type === "coach" ? session.clients[0] : session.coach
        return {
          id: session.id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar,
          time: formatDates(session.startDatetime, session.endDatetime),
          sessionIsStarted: isStartedSession(session)
        }
      })
      .slice(0, 1)
  })

  forward({
    from: load,
    to: loadSessionsFx,
  })

  forward({
    from: loadSessionsFx.doneData,
    to: changeSessionsList,
  })

  return {
    data: {
      $sessions,
    },
    methods: {
      load,
      reset,
      connectToSession: config.sessionCallModule.methods.connectToSession,
    },
  }
}
