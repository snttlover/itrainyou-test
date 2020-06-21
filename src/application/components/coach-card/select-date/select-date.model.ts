import { toasts } from "@/application/components/layouts/behaviors/dashboards/common/toasts/toasts"
import {
  CoachSession,
  DurationType,
  getCoachSessions,
  GetCoachSessionsParamsTypes,
} from "@/application/lib/api/coach-sessions"
import { bulkBookSessions } from "@/application/lib/api/sessions requests/client/bulk-book-sessions"
import { attach, createEffect, createEvent, createStore, forward, restore } from "effector-next"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

type RequestType = {
  id?: number
  params: GetCoachSessionsParamsTypes
}

export const genCoachSessions = (id = 0) => {
  const changeId = createEvent<number>()
  const $id = createStore<number>(id).on(changeId, (_, id) => id)

  const fetchCoachSessionsListFx = createEffect<GetCoachSessionsParamsTypes, CoachSession[]>().use(params =>
    getCoachSessions($id.getState(), params)
  )

  const loadCoachSessions = createEvent<RequestType>()
  const loadParams = restore(
    loadCoachSessions.map(req => req.params),
    {}
  )

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
    .on(toggleSession, state => {
      const ids = selectedSessionIds.getState()
      return state.map(session => {
        session.selected = ids.includes(session.id)
        return session
      })
    })
    .on(deleteSession, state => {
      const ids = selectedSessionIds.getState()
      return state.map(session => {
        session.selected = ids.includes(session.id)
        return session
      })
    })

  forward({
    from: loadCoachSessions.map(req => req.params),
    to: fetchCoachSessionsListFx,
  })

  const buySessionBulk = createEvent<number[]>()

  const buySessionsFx = createEffect({
    handler: bulkBookSessions,
  })

  forward({
    from: buySessionBulk.map(sessions => ({ sessions })),
    to: buySessionsFx,
  })

  forward({
    from: buySessionsFx.done,
    to: toasts.add.prepend(() => ({ type: "info", text: "Сессии успешно забронированы" })),
  })

  forward({
    from: buySessionsFx.done,
    to: attach({
      source: loadParams,
      effect: fetchCoachSessionsListFx,
      mapParams: (_, params) => params,
    }),
  })

  const changeDurationTab = createEvent<DurationType>()
  const $durationTab = createStore<DurationType>("D30").on(changeDurationTab, (_, payload) => payload)

  changeDurationTab.watch(state => {
    return loadCoachSessions({
      id: $id.getState(),
      params: {
        duration_type: $durationTab.getState(),
      },
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
      changeDurationTab,
    },
    buySessionsLoading: buySessionsFx.pending,
    buySessionBulk,
  }
}
