import { CoachSession, getCoachSessions } from "@/application/lib/api/coach-sessions"
import { appDomain } from "@/application/store"
import { forward } from "effector"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

export const genCoachSessions = (id: number) => {
  const coachSession = appDomain.createDomain()

  const fetchCoachSessionsListFx = coachSession.createEffect<void, CoachSession[]>().use(() => getCoachSessions(id, {}))

  const loadCoachSessions = coachSession.createEvent()
  const toggleSession = coachSession.createEvent<CoachSessionWithSelect>()

  const $coachSessionsList = coachSession
    .createStore<CoachSessionWithSelect[]>([])
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
