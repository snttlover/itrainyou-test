import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { CoachSession, DurationType, getCoachSessions, GetCoachSessionsParamsTypes } from "@/lib/api/coach-sessions"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { bulkBookSessions, BulkBookSessionsRequest } from "@/lib/api/sessions-requests/client/bulk-book-sessions"
import { isAxiosError } from "@/lib/network/network"
import { routeNames } from "@/pages/route-names"
import { runInScope } from "@/scope"
import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
  split,
  guard,
  Store
} from "effector-root"
import { changeShowFundUpDialog, finishSaveClientCardFx, setRedirectUrl } from "@/feature/client-funds-up/dialog/models/units"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"
import { getFreeSessionsList } from "@/lib/api/free-sessions/free-sessions"
import { createClientSessionRequest } from "@/lib/api/client/create-client-session-request"
import { SessionRequestParams } from "@/lib/api/coach/create-session-request"
import { getMyUserFx, GetMyUserResponse } from "@/lib/api/users/get-my-user"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

type RequestType = {
  id?: number
  params: GetCoachSessionsParamsTypes
}

// Вынес из функции genCoachSessions, чтобы можно было цепляться на этот эффект из любого места проекта,
// Не дожидаясь, пока genCoachSessions выполнится в нужном месте
export const buySessionsFx = createEffect({
  handler: (params: BulkBookSessionsRequest) => bulkBookSessions(params),
})

export const genFreeSessions = () => {

  const fetchFreeSessionsListFx = createEffect<
    GetCoachSessionsParamsTypes,
    CoachSession[]
  >().use((params) => getFreeSessionsList(params))

  const loadAllFreeSessions = createEvent<RequestType>()

  const bulkFreeSessionFx = createEffect({
    handler: (params: SessionRequestParams) => createClientSessionRequest(params)
  })

  const isFetching = createStore(false)
    .on(loadAllFreeSessions, () => true)
    .on(fetchFreeSessionsListFx, () => true)
    .on(fetchFreeSessionsListFx.finally, () => false)

  const toggleSession = createEvent<CoachSessionWithSelect>()
  const deleteSession = createEvent<number>()
  const resetSelectedSessions = createEvent()

  const selectedSessionIds = createStore<number[]>([])
    .on(toggleSession, (state, selectedSession) => {
      if (state.includes(selectedSession.id)) {
        return state.filter(id => id !== selectedSession.id)
      } else {
        return [selectedSession.id]
      }
    })
    .on(deleteSession, (state, sessionId) => state.filter(id => sessionId !== id))
    .reset(resetSelectedSessions)

  const $freeSessions = restore(fetchFreeSessionsListFx.doneData, [])

  const $freeSessionsList = combine($freeSessions, selectedSessionIds, (sessions, selected) =>
    sessions.map(session => ({ ...session, selected: selected.includes(session.id) }))
  )

  forward({
    from: loadAllFreeSessions.map((req) => ({
      ...req.params,
    })),
    to: fetchFreeSessionsListFx,
  })

  const bulkFreeSession = createEvent<SessionRequestParams>()


  forward({
    from: bulkFreeSessionFx.done,
    to: resetSelectedSessions,
  })

  forward({
    from: bulkFreeSessionFx.done,
    to: getMyUserFx,
  })

  forward({
    from: bulkFreeSession,
    to: bulkFreeSessionFx,
  })

  const { insufficientBalance, __: unknownError } = split(bulkFreeSessionFx.fail, {
    insufficientBalance: ({ error }) => isAxiosError(error) && error.response?.data.code === "INSUFFICIENT_BALANCE",
  })


  /*sample({ clock: insufficientBalance, source: $id }).watch(id => {
    runInScope(toasts.remove, sessionBookFailByInsufficientBalanceToast)
    runInScope(toasts.add, sessionBookFailByInsufficientBalanceToast)
    runInScope(changeShowFundUpDialog, true)
    runInScope(setRedirectUrl, routeNames.searchCoachPage(id.toString()))
  })*/

  const sessionBookFailToast: Toast = { type: "error", text: "Не удалось забронировать сессию" }
  unknownError.watch(() => {
    runInScope(toasts.remove, sessionBookFailToast)
    runInScope(toasts.add, sessionBookFailToast)
  })

  return {
    loading: isFetching,
    sessionsList: $freeSessionsList,
    loadData: loadAllFreeSessions,
    toggleSession,
    deleteSession,
    buySessionsLoading: bulkFreeSessionFx.pending,
    bulkFreeSession,
  }
}


export const genCoachSessions = (id = 0, freeSessions = false) => {
  const changeId = createEvent<number>()
  const $id = createStore<number>(id).on(changeId, (_, id) => id)

  const fetchCoachSessionsListFx = createEffect<
    { id: number } & GetCoachSessionsParamsTypes,
    CoachSession[]
    >().use(({ id, ...params }) => getCoachSessions(id, params))

  const loadCoachSessions = createEvent<RequestType>()
  const loadParams = restore(
    loadCoachSessions.map(req => req.params),
    {}
  )

  const bulkFreeSessionFx = createEffect({
    handler: (params: SessionRequestParams) => createClientSessionRequest(params)
  })

  const isFetching = createStore(false)
    .on(loadCoachSessions, () => true)
    .on(fetchCoachSessionsListFx, () => true)
    .on(fetchCoachSessionsListFx.finally, () => false)

  const toggleSession = createEvent<CoachSessionWithSelect>()
  const deleteSession = createEvent<number>()
  const resetSelectedSessions = createEvent()

  const selectedSessionIds = createStore<number[]>([])
    .on(toggleSession, (state, selectedSession) => {
      if (state.includes(selectedSession.id)) {
        return state.filter(id => id !== selectedSession.id)
      } else {
        if (freeSessions) {
          return [selectedSession.id]
        }
        else {
          return [...state, selectedSession.id]
        }
      }
    })
    .on(deleteSession, (state, sessionId) => state.filter(id => sessionId !== id))
    .reset(resetSelectedSessions)

  const $coachSessions = restore(fetchCoachSessionsListFx.doneData, [])

  const $coachSessionsList = combine($coachSessions, selectedSessionIds, (sessions, selected) =>
    sessions.map(session => ({ ...session, selected: selected.includes(session.id) }))
  )

  const bulkFreeSession = createEvent<SessionRequestParams>()

  const buySessionBulk = createEvent<BulkBookSessionsRequest>()

  forward({
    from: buySessionBulk.map((params) => {
      localStorage.removeItem("sessions")
      return params
    }),
    to: buySessionsFx,
  })

  forward({
    from: buySessionsFx.done,
    to: resetSelectedSessions
  })

  forward({
    from: bulkFreeSession,
    to: bulkFreeSessionFx,
  })

  forward({
    from: bulkFreeSessionFx.done,
    to: getMyUserFx,
  })


  const { insufficientBalance, __: unknownError } = split(buySessionsFx.fail, {
    insufficientBalance: ({ error }) => isAxiosError(error) && error.response?.data.code === "INSUFFICIENT_BALANCE",
  })

  const sessionBookFailByInsufficientBalanceToast: Toast = {
    type: "error",
    text: "Недостаточно средств, пополните баланс",
  }
  sample({ clock: insufficientBalance, source: $id }).watch(id => {
    runInScope(toasts.remove, sessionBookFailByInsufficientBalanceToast)
    runInScope(toasts.add, sessionBookFailByInsufficientBalanceToast)
    runInScope(changeShowFundUpDialog, true)
    runInScope(setRedirectUrl, routeNames.searchCoachPage(id.toString()))
  })

  const sessionBookFailToast: Toast = { type: "error", text: "Не удалось забронировать сессию" }
  unknownError.watch(() => {
    runInScope(toasts.remove, sessionBookFailToast)
    runInScope(toasts.add, sessionBookFailToast)
  })

  const $isId = $id.map(state => state > 0)

  sample({
    clock: guard({source: buySessionsFx.finally, filter: $isId}),
    source: $id,
    target: attach({
      source: loadParams,
      effect: fetchCoachSessionsListFx,
      mapParams: (id: number, params) => ({ id, ...params }),
    }),
  })

  sample({
    clock: guard({source: loadCoachSessions, filter: $isId}),
    source: $id,
    fn: (id, req) => ({
      id,
      ...req.params,
    }),
    target: fetchCoachSessionsListFx,
  })

  const changeDurationTab = createEvent<DurationType>()

  const initialTabState = freeSessions ? "PROMO" : "D30"
  const $durationTab = createStore<DurationType>(initialTabState).on(changeDurationTab, (_, payload) => payload)

  $durationTab.watch(payload => console.log("$durationTab",payload))
  changeDurationTab.watch(payload => console.log("changeDurationTab",payload))

  sample({
    clock: changeDurationTab,
    source: combine({ durationTab: $durationTab, coachId: $id }),
    fn: ({ durationTab, coachId }) => ({
      id: coachId,
      params: {
        duration_type: durationTab,
      },
    }),
    target: loadCoachSessions,
  })

  forward({
    from: bulkFreeSessionFx.done,
    to: loadCoachSessions.prepend(_ => ({params: {},})),
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
    buySessionsLoading: combine(
      buySessionsFx.pending,
      finishSaveClientCardFx.pending,
      bulkFreeSessionFx.pending,
      (buySessionsPending, finishSaveCardPending, bulkFreeSessionFx) => buySessionsPending || finishSaveCardPending || bulkFreeSessionFx
    ),
    buySessionBulk,
    bulkFreeSession,
    buySessionsFx
  }
}
