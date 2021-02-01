import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
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
  restore,
  sample,
  split,
  Store
} from "effector-root"
import { mounted, toggleCreditCardsModal } from "@/pages/search/coach-by-id/models/units"
import { changeShowFundUpDialog, finishSaveCardFx, setRedirectUrl } from "@/feature/client-funds-up/dialog/models/units"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"

export interface CoachSessionWithSelect extends CoachSession {
  selected: boolean
}

type RequestType = {
  id?: number
  params: GetCoachSessionsParamsTypes
}

export type BookedSessionForViewType = {
  id: number
  startDatetime: string
  endDatetime: string
  durationType: string
  coach: CoachItemType
  coachPrice: string
}

export type BookedSessionsForViewTypes = Store<BookedSessionForViewType[]>

// ToDo: отрефакторить, слишком перегруженная функция с кучей связей из разных модулей
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

  const buySessionBulk = createEvent<BulkBookSessionsRequest>()

  const $bookedSessions = createStore([])

  const $bookedSessionsForView = $bookedSessions.map(sessions =>
    sessions.map((session: BookedSessionForViewType) => ({
      id: session.id,
      startDateTime: session.startDatetime,
      endDateTime: session.endDatetime,
      duration: session.durationType,
      coach: session.coach,
      price: session.coachPrice,
    }))
  )

  const buySessionsFx = createEffect({
    handler: (params: BulkBookSessionsRequest) => bulkBookSessions(params),
  })

  // ToDO: mounted берется из абсолютно другого модуля, genCoachSession не должен знать о других модулях. отерфакторить
  $bookedSessions.on(
    buySessionsFx.doneData,
    (state, payload) => payload
  ).reset([mounted])

  forward({
    from: buySessionBulk.map((params) => {
      localStorage.removeItem("sessions")
      return params
    }),
    to: buySessionsFx,
  })

  // Логика с модалкой результата покупки сессий
  const $bookSessionsStatusModalVisibility = createStore<boolean>(false)
  const toggleBookSessionsStatusModal = createEvent<void | boolean>()

  $bookSessionsStatusModalVisibility.on(
    toggleBookSessionsStatusModal,
    (state, payload) => {
      if (payload !== undefined) return payload
      return !state
    })
    .on(finishSaveCardFx, () => true)
    .reset([mounted])

  forward({
    from: buySessionsFx,
    to: [
      toggleCreditCardsModal.prepend(() => false),
      toggleBookSessionsStatusModal.prepend(() => true)
    ]
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
    buySessionsLoading: combine(
      buySessionsFx.pending,
      finishSaveCardFx.pending,
      (buySessionsPending, finishSaveCardPending) => {
        console.log("nu che")
        console.log(finishSaveCardPending)
        return buySessionsPending || finishSaveCardPending
      }
    ),
    buySessionBulk,
    buySessionsFx,
    $bookedSessionsForView,
    $bookSessionsStatusModalVisibility,
    toggleBookSessionsStatusModal
  }
}
