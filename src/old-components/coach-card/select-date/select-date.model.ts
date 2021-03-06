import { Toast, toasts } from "@/old-components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CoachSession, DurationType, getCoachSessions, GetCoachSessionsParamsTypes } from "@/lib/api/coach-sessions"
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
  guard,
  restore,
  sample,
  split,
} from "effector-root"
import {
  changeShowFundUpDialog,
  finishSaveClientCardFx,
  setRedirectUrl
} from "@/feature/client-funds-up/dialog/models/units"
import { getFreeSessionsList } from "@/lib/api/free-sessions/free-sessions"
import { createClientSessionRequest } from "@/lib/api/client/create-client-session-request"
import { SessionRequestParams } from "@/lib/api/coach/create-session-request"
import { ymLog } from "@/lib/external-services/yandex-metrika/lib"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

type RequestType = {
  id?: number
  params?: GetCoachSessionsParamsTypes
}

// Вынес из функции genCoachSessions, чтобы можно было цепляться на этот эффект из любого места проекта,
// Не дожидаясь, пока genCoachSessions выполнится в нужном месте
export const buySessionsFx = createEffect({
  handler: (params: BulkBookSessionsRequest) => bulkBookSessions(params),
})

export const bulkAnySessionFx = createEffect({
  handler: (params: SessionRequestParams) => createClientSessionRequest(params)
})

export const genFreeSessions = () => {

  const fetchFreeSessionsListFx = createEffect<
    GetCoachSessionsParamsTypes,
    CoachSession[]
  >().use((params) => getFreeSessionsList(params))

  const loadAllFreeSessions = createEvent<RequestType>()

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

  const successfulBookedToast: Toast = { text: "Запрос отправлен коучу", type: "info" }

  forward({
    from: loadAllFreeSessions.map((req) => ({
      ...req.params,
    })),
    to: fetchFreeSessionsListFx,
  })

  const bulkFreeSession = createEvent<SessionRequestParams>()

  bulkFreeSession.watch(payload => ymLog("reachGoal", "bookingdate"))


  forward({
    from: bulkAnySessionFx.done,
    to: [resetSelectedSessions, getMyUserApiFx.fx],
  })

  forward({
    from: bulkAnySessionFx.done.map(_ => successfulBookedToast),
    to: [toasts.add, toasts.remove],
  })

  forward({
    from: bulkFreeSession,
    to: bulkAnySessionFx,
  })

  const { insufficientBalance, __: unknownError } = split(bulkAnySessionFx.fail, {
    insufficientBalance: ({ error }) => isAxiosError(error) && error.response?.data.code === "INSUFFICIENT_BALANCE",
  })

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
    buySessionsLoading: bulkAnySessionFx.pending,
    bulkFreeSession,
  }
}


export const genCoachSessions = (id = 0, onlyFreeSessions = false) => {
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
        // Если сессии бесплатные, то можно выбрать только одну (а не несколько, как в платных)
        if (onlyFreeSessions) {
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

  const bulkSession = createEvent<SessionRequestParams>()

  const buySessionBulk = createEvent<BulkBookSessionsRequest>()

  buySessionBulk.watch(payload => {
    const args = onlyFreeSessions ? "bookingdate" : "bookingcoach"
    ymLog("reachGoal", args)
  })

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
    from: bulkSession,
    to: bulkAnySessionFx,
  })

  forward({
    from: bulkAnySessionFx.done,
    to: getMyUserApiFx.fx,
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

  const changeDurationTab = createEvent<{duration: DurationType, params?: GetCoachSessionsParamsTypes}>()

  const initialTabState = {
    duration: onlyFreeSessions ? "PROMO" : "D30" as DurationType,
  }

  const $durationTab = createStore<{duration: DurationType, params?: GetCoachSessionsParamsTypes}>(initialTabState).on(changeDurationTab, (_, payload) => payload)

  sample({
    clock: changeDurationTab,
    source: combine({ durationTab: $durationTab, coachId: $id }),
    fn: ({ durationTab, coachId }) => ({
      id: coachId,
      params: {
        duration_type: durationTab.duration,
        ...durationTab.params
      },
    }),
    target: loadCoachSessions,
  })

  forward({
    from: bulkAnySessionFx.done,
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
      bulkAnySessionFx.pending,
      (buySessionsPending, finishSaveCardPending, bulkFreeSessionFx) => buySessionsPending || finishSaveCardPending || bulkFreeSessionFx
    ),
    buySessionBulk,
    bulkSession,
    buySessionsFx
  }
}
