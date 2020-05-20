import {
  CoachSession,
  DurationType,
  getCoachSessions,
  GetCoachSessionsParamsTypes
} from "@/application/lib/api/coach-sessions"
import { createEffect, createEvent, createStore, forward } from "effector-next"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

type RequestType = {
  id?: number
  params: GetCoachSessionsParamsTypes
}

export const genCoachSessions = (id= 0) => {
  const changeId = createEvent<number>()
  const $id = createStore<number>(id)
    .on(changeId, (_, id) => id)

  const fetchCoachSessionsListFx = createEffect<RequestType, CoachSession[]>()
    .use((req) => getCoachSessions($id.getState(), req.params))

  const loadCoachSessions = createEvent<RequestType>()

  const isFetching = createStore(false)
    .on(loadCoachSessions, () => true)
    .on(fetchCoachSessionsListFx, () => true)
    .on(fetchCoachSessionsListFx.finally, () => false)

  const toggleSession = createEvent<CoachSessionWithSelect>()
  const deleteSession = createEvent<number>()

  const selectedSessionIds = createStore<number[]>([])
    .on(toggleSession, (state, selectedSession) => {
      if (state.includes(selectedSession.id)) {
        return state.filter(id => id !== selectedSession.id)
      } else {
        state.push(selectedSession.id)
        return state
      }
    })
    .on(deleteSession, (state, sessionId) => state.filter(id => sessionId !== id))

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
    .on(deleteSession, (state) => {
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

  const changeDurationTab = createEvent<DurationType>()
  const $durationTab = createStore<DurationType>('D30')
    .on(changeDurationTab, (_, payload) => payload)

  changeDurationTab.watch((state) => {
    return loadCoachSessions({
      id: $id.getState(),
      params: {
        duration_type: $durationTab.getState()
      }
    })
  })

  return {
    changeId,
    loading: isFetching,
    sessionsList: $coachSessionsList,
    loadData: loadCoachSessions,
    toggleSession,
    deleteSession,
    tabs: {
      $durationTab,
      changeDurationTab
    }
  }
}
