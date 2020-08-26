import { ISODate, Pagination } from "@/lib/api/interfaces/utils.interface"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { createEffect, createEvent, forward, restore } from "effector-root"
import { date } from "@/lib/formatting/date"

type CreateStartSessionToolbarModelConfig = {
  type: "coach" | "client"
  fetchSessions: () => Promise<DashboardSession[]>
}

const formatDates = (start: ISODate, end: ISODate) => {
  return `${date(start).format(`HH:mm`)} - ${date(end).format(`HH:mm`)}`
}

const isStartedSession = (session: DashboardSession) => date().isBetween(date(session.startDatetime), date(session.endDatetime))

export const createStartSessionToolbarModel = (config: CreateStartSessionToolbarModelConfig) => {
  const reset = createEvent()
  const loadSessionsFx = createEffect({
    handler: config.fetchSessions
  })
  const load = createEvent()

  const changeSessionsList = createEvent<DashboardSession[]>()
  const $sessionsList = restore(changeSessionsList, []).reset(reset)

  const $sessions = $sessionsList.map(sessions =>
    sessions.filter(isStartedSession).map(session => {
      const user = config.type === `coach` ? session.clients[0] : session.coach

      return {
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
        time: formatDates(session.startDatetime, session.endDatetime),
      }
    })
  )

  forward({
    from: load,
    to: loadSessionsFx
  })

  forward({
    from: loadSessionsFx.doneData,
    to: changeSessionsList
  })

  return {
    data: {
      $sessions,
    },
    methods: {
      load,
      reset
    }
  }
}
