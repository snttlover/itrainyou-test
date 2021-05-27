import { forward, guard, sample } from "effector-root"
import {
  $coach,
  $creditCardsModalVisibility,
  $id,
  $isFavourite,
  $isNotFound,
  $reviews,
  addToFavouriteFx, changeCoachFreeSessionCoachId, changeCoachFreeSessionDurationTab,
  changeCoachSessionCoachId,
  changeCoachSessionDurationTab,
  loadCoachFx,
  loadReviewsFx,
  mounted,
  removeFromFavouriteFx,
  toggleCreditCardsModal,
  toggleFavourite
} from "@/pages/search/coach-by-id/models/units"

$creditCardsModalVisibility.on(
  toggleCreditCardsModal,
  (state, payload) => {
    if (payload !== undefined) return payload
    return !state
  })
  .reset(mounted)

$coach.on(
  loadCoachFx.doneData,
  (state, payload) => payload
).reset([mounted])

$isNotFound.on(
  loadCoachFx.failData, () => true
).reset([mounted])

$reviews.on(
  loadReviewsFx.doneData,
  (state, payload) => payload.results
)

$isFavourite.on(toggleFavourite, state => !state)

forward({
  from: loadCoachFx.doneData,
  to: [
    changeCoachSessionCoachId,
    changeCoachSessionDurationTab,
    changeCoachFreeSessionCoachId,
    changeCoachFreeSessionDurationTab
  ],
})

forward({
  from: mounted,
  to: [loadCoachFx, loadReviewsFx],
})

sample({
  clock: guard({ source: toggleFavourite, filter: $isFavourite }),
  source: $id,
  fn: id => ({ id }),
  target: addToFavouriteFx,
})

sample({
  clock: guard({ source: toggleFavourite, filter: $isFavourite.map(is => !is) }),
  source: $id,
  fn: id => ({ id }),
  target: removeFromFavouriteFx,
})
