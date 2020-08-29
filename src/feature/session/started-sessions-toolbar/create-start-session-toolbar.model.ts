import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { createEffect, createEvent, forward, restore, combine } from "effector"
import { date } from "@/lib/formatting/date"
import { createSessionCallModule } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"

type CreateStartSessionToolbarModelConfig = {
  type: "coach" | "client"
  fetchSessions: () => Promise<DashboardSession[]>
  sessionCallModule: ReturnType<typeof createSessionCallModule>
}

const formatDates = (start: ISODate, end: ISODate) => {
  return `${date(start).format(`HH:mm`)} - ${date(end).format(`HH:mm`)}`
}

const isStartedSession = (session: DashboardSession) =>
  date().isBetween(date(session.startDatetime), date(session.endDatetime))

export const createStartSessionToolbarModel = (config: CreateStartSessionToolbarModelConfig) => {
  const reset = createEvent()
  const loadSessionsFx = createEffect({
    handler: config.fetchSessions,
  })
  const load = createEvent()

  const changeSessionsList = createEvent<DashboardSession[]>()
  const $sessionsList = restore(changeSessionsList, []).reset(reset)

  const $lastCallId = restore(config.sessionCallModule.methods.connectToSession, 0).reset(
    config.sessionCallModule.methods.close
  )

  const $sessions = combine($sessionsList, $lastCallId, (sessions, currentSessionCall) => {
    console.log(currentSessionCall)
    return sessions
      .filter(session => session.id !== currentSessionCall)
      .filter(isStartedSession)
      .map(session => {
        const user = config.type === `coach` ? session.clients[0] : session.coach

        return {
          id: session.id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatar,
          time: formatDates(session.startDatetime, session.endDatetime),
        }
      })
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
