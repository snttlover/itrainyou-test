import {
  CoachSession,
  DurationType,
  getCoachSessions,
  GetCoachSessionsParamsTypes
} from "@/application/lib/api/coach-sessions"
import { createEffect, createEvent, createStore, forward } from "effector-next"
import { Coach } from "@/application/lib/api/coach"
import { Simulate } from "react-dom/test-utils"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

export const genCoachSessions = (coach: Coach) => {
  const fetchCoachSessionsListFx = createEffect<GetCoachSessionsParamsTypes, CoachSession[]>().use((params) => getCoachSessions(coach.id, params))

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

  const [selectedTab] = Object.entries(coach.prices).find(([key, value]) => value !== `None`)

  const changeDurationTab = createEvent<DurationType>()
  const $durationTab = createStore<DurationType>(selectedTab as DurationType).on(changeDurationTab, (_, payload) => payload)

  $durationTab.watch((state) => loadCoachSessions({
    duration_type: state
  }))

  return {
    loading: isFetching,
    list: $coachSessionsList,
    loadData: loadCoachSessions,
    toggleSession,
    tabs: {
      $durationTab,
      changeDurationTab
    }
  }
}
