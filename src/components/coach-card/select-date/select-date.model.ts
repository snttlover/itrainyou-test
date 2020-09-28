import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { changeShowFundUpDialog } from "@/feature/client-funds-up/dialog/fund-up.model"
import { CoachSession, DurationType, getCoachSessions, GetCoachSessionsParamsTypes } from "@/lib/api/coach-sessions"
import { bulkBookSessions } from "@/lib/api/sessions-requests/client/bulk-book-sessions"
import { isAxiosError } from "@/lib/network/network"
import { runInScope } from "@/scope"
import { attach, combine, createEffect, createEvent, createStore, forward, restore, sample, split } from "effector-root"

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
        return [...state, selectedSession.id]
      }
    })
    .on(deleteSession, (state, sessionId) => state.filter(id => sessionId !== id))
    .reset(resetSelectedSessions)

  const $coachSessions = restore(fetchCoachSessionsListFx.doneData, [])

  const $coachSessionsList = combine($coachSessions, selectedSessionIds, (sessions, selected) =>
    sessions.map(session => ({ ...session, selected: selected.includes(session.id) }))
  )

  sample({
    clock: loadCoachSessions,
    source: $id,
    fn: (id, req) => ({
      id,
      ...req.params,
    }),
    target: fetchCoachSessionsListFx,
  })

  const buySessionBulk = createEvent<number[]>()

  const buySessionsFx = createEffect({
    handler: bulkBookSessions,
  })

  forward({
    from: buySessionBulk.map(sessions => ({ sessions })),
    to: buySessionsFx,
  })

  const sessionBookSuccessToast: Toast = { type: "info", text: "Коучу был отправлен запрос на бронирование" }
  buySessionsFx.done.watch(() => {
    runInScope(toasts.remove, sessionBookSuccessToast)
    runInScope(toasts.add, sessionBookSuccessToast)
    resetSelectedSessions()
    // runInScope(clientChatsList.methods.reset)
  })

  const { insufficientBalance, __: unknownError } = split(buySessionsFx.fail, {
    insufficientBalance: ({ error }) => isAxiosError(error) && error.response?.data.code === "INSUFFICIENT_BALANCE",
  })

  const sessionBookFailByInsufficientBalanceToast: Toast = {
    type: "error",
    text: "Недостаточно средств, пополните баланс",
  }
  insufficientBalance.watch(() => {
    runInScope(toasts.remove, sessionBookFailByInsufficientBalanceToast)
    runInScope(toasts.add, sessionBookFailByInsufficientBalanceToast)
    runInScope(changeShowFundUpDialog, true)
  })

  const sessionBookFailToast: Toast = { type: "error", text: "Не удалось забронировать сессию" }
  unknownError.watch(() => {
    runInScope(toasts.remove, sessionBookFailToast)
    runInScope(toasts.add, sessionBookFailToast)
  })

  sample({
    clock: buySessionsFx.finally,
    source: $id,
    target: attach({
      source: loadParams,
      effect: fetchCoachSessionsListFx,
      mapParams: (id: number, params) => ({ id, ...params }),
    }),
  })

  const changeDurationTab = createEvent<DurationType>()
  const $durationTab = createStore<DurationType>("D30").on(changeDurationTab, (_, payload) => payload)

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
