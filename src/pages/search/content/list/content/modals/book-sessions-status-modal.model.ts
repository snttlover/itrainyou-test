import { combine, createEvent, createStore, forward } from "effector-root"
import { mounted, toggleCreditCardsModal } from "@/pages/search/coach-by-id/models/units"
import { BookedSessionForViewType, buySessionsFx } from "@/components/coach-card/select-date/select-date.model"
import { finishSaveCardFx } from "@/feature/client-funds-up/dialog/models/units"

export const $bookedSessions = createStore([])

export const $bookedSessionsForView = $bookedSessions.map(sessions =>
  sessions.map((session: BookedSessionForViewType) => ({
    id: session.id,
    startDateTime: session.startDatetime,
    endDateTime: session.endDatetime,
    duration: session.durationType,
    coach: session.coach,
    price: session.coachPrice,
  }))
)

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
