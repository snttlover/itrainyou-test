import { CoachSession, getCoachSessions } from "@/application/lib/api/coach-sessions"
import { createEffect, createEvent, createStore, forward } from "effector-next"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

export const genCoachSessions = (id: number) => {
  const fetchCoachSessionsListFx = createEffect<void, CoachSession[]>().use(() => getCoachSessions(id, {}))

  const loadCoachSessions = createEvent()
  const toggleSession = createEvent<CoachSessionWithSelect>()

  const $coachSessionsList = createStore<CoachSessionWithSelect[]>([])
    .on(fetchCoachSessionsListFx.done, (state, payload) =>
      payload.result.map(session => ({ ...session, selected: false }))
    )
    .on(toggleSession, (state, selectedSession) => {
      return state.map(session => {
        if (session.id === selectedSession.id) {
          session.selected = !session.selected
        }
        return session
      })
    })

  forward({
    from: loadCoachSessions,
    to: fetchCoachSessionsListFx
  })

  return {
    list: $coachSessionsList,
    loadData: loadCoachSessions,
    toggleSession
  }
}
