import { CoachSession, getCoachSessions, GetCoachSessionsParamsTypes } from "@/application/lib/api/coach-sessions"
import { createEffect, createEvent, createStore, forward } from "effector-next"
import { Coach } from "@/application/lib/api/coach"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

export const genCoachSessions = (coach: Coach) => {
  const fetchCoachSessionsListFx = createEffect<GetCoachSessionsParamsTypes, CoachSession[]>().use(() => getCoachSessions(coach.id, {}))

  const isFetching = createStore(false)
    .on(fetchCoachSessionsListFx, () => true)
    .on(fetchCoachSessionsListFx.finally, () => false)

  const loadCoachSessions = createEvent<GetCoachSessionsParamsTypes>()
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
    loading: isFetching,
    list: $coachSessionsList,
    loadData: loadCoachSessions,
    toggleSession
  }
}
