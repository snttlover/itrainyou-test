import { combine, createEvent, createStore, forward, Store } from "effector-root"
import { mounted, toggleCreditCardsModal } from "@/pages/search/coach-by-id/models/units"
import { buySessionsFx, bulkAnySessionFx } from "@/old-components/coach-card/select-date/select-date.model"
import { finishSaveClientCardFx } from "@/feature/client-funds-up/dialog/models/units"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"
import { Coach } from "@/lib/api/coach"
import { CoachSessionWithSelect } from "@/old-components/coach-card/select-date/select-date.model"

export type BookedSessionForViewType = {
  id: number
  startDatetime: string
  endDatetime: string
  durationType: string
  coach: CoachItemType | Coach
  clientPrice: string
}

export const changeFreeBookedSession = createEvent<CoachSessionWithSelect>()
export const $bookedSessions = createStore<BookedSessionForViewType[]>([])

// export const 

// @ts-ignore
$bookedSessions.on(
  buySessionsFx.doneData,
  (state, payload) => payload
).on(changeFreeBookedSession, (state, payload) => [{
  id: payload.id,
  startDatetime: payload.startDatetime,
  endDatetime: payload.endDatetime,
  durationType: payload.durationType,
  coach: payload.coach,
  clientPrice: "0",
}]).reset([mounted])

export const $bookSessionsStatusModalVisibility = createStore<boolean>(false)
export const toggleBookSessionsStatusModal = createEvent<void | boolean>()

$bookSessionsStatusModalVisibility.on(
  toggleBookSessionsStatusModal,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })
  .on(finishSaveClientCardFx, () => true)
  .on(bulkAnySessionFx.done, () => true)
  .reset([mounted])

forward({
  from: buySessionsFx,
  to: [
    toggleCreditCardsModal.prepend(() => false),
    toggleBookSessionsStatusModal.prepend(() => true)
  ]
})


export const $buySessionsLoading = combine(
  buySessionsFx.pending,
  finishSaveClientCardFx.pending,
  (buySessionsPending, finishSaveCardPending) => buySessionsPending || finishSaveCardPending
)
