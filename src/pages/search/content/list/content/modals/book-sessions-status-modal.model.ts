import { combine, createEvent, createStore, forward, Store } from "effector-root"
import { mounted, toggleCreditCardsModal } from "@/pages/search/coach-by-id/models/units"
import { buySessionsFx } from "@/components/coach-card/select-date/select-date.model"
import { finishSaveCardFx } from "@/feature/client-funds-up/dialog/models/units"
import { CoachItemType } from "@/lib/api/wallet/client/get-card-sessions"

export type BookedSessionForViewType = {
  id: number
  startDatetime: string
  endDatetime: string
  durationType: string
  coach: CoachItemType
  clientPrice: string
}

export const $bookedSessions = createStore<BookedSessionForViewType[]>([])

$bookedSessions.on(
  buySessionsFx.doneData,
  (state, payload) => payload
).reset([mounted])

export const $bookSessionsStatusModalVisibility = createStore<boolean>(false)
export const toggleBookSessionsStatusModal = createEvent<void | boolean>()

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


export const $buySessionsLoading = combine(
  buySessionsFx.pending,
  finishSaveCardFx.pending,
  (buySessionsPending, finishSaveCardPending) => buySessionsPending || finishSaveCardPending
)
