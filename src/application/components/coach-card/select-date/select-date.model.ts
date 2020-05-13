import {
  CoachSession,
  DurationType,
  getCoachSessions,
  GetCoachSessionsParamsTypes
} from "@/application/lib/api/coach-sessions"
import { createEffect, createEvent, createStore, forward } from "effector-next"
import { Coach } from "@/application/lib/api/coach"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

export type TimeTabType = {
  timeInMinutes: number
  price: number
  key: DurationType
}

export const genCoachSessions = (coach: Coach) => {
  const fetchCoachSessionsListFx = createEffect<GetCoachSessionsParamsTypes, CoachSession[]>().use((params) => getCoachSessions(coach.id, params))

  const isFetching = createStore(false)
    .on(fetchCoachSessionsListFx, () => true)
    .on(fetchCoachSessionsListFx.finally, () => false)

  const loadCoachSessions = createEvent<GetCoachSessionsParamsTypes>()
  const toggleSession = createEvent<CoachSessionWithSelect>()

  const selectedSessionIds = createStore<number[]>([])
    .on(toggleSession, (state, selectedSession) => {
      if (state.includes(selectedSession.id)) {
        return state.filter(id => id !== selectedSession.id)
      } else {
        state.push(selectedSession.id)
        return state
      }
    })

  const $coachSessionsList = createStore<CoachSessionWithSelect[]>([])
    .on(fetchCoachSessionsListFx.done, (state, payload) => {
      const ids = selectedSessionIds.getState()
      return payload.result.map(session => ({ ...session, selected: ids.includes(session.id) }))
    })
    .on(toggleSession, (state) => {
      const ids = selectedSessionIds.getState()
      return state.map(session => {
        session.selected = ids.includes(session.id)
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

  const UITabs = Object.keys(coach.prices)
    .filter(key => coach.prices[key as DurationType] !== `None`)
    .map((key): TimeTabType => ({
      timeInMinutes: parseInt(key.replace( /^\D+/g, '')) as number,
      key: key as DurationType,
      price: Math.ceil(coach.prices[key as DurationType] as number)
    }))

  return {
    loading: isFetching,
    list: $coachSessionsList,
    loadData: loadCoachSessions,
    toggleSession,
    tabs: {
      list: UITabs,
      $durationTab,
      changeDurationTab
    }
  }
}
