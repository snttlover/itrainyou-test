import { attach, forward, guard, sample, split } from "effector-root"
import {
  $redirectUrl,
  addCard,
  deletePaymentIdFx,
  finishSaveCardFx,
  getPaymentIdFx,
  loadSessionsIdFx,
  setRedirectUrl,
  startSaveCardFx,
  successfulAddedCard,
  unsuccessfulAddedCard
} from "@/feature/client-funds-up/dialog/models/units"
import { toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { loadInfoFx } from "@/pages/client/wallet/info/info.model"
import { loadCardsFx } from "@/pages/client/wallet/cards/cards.model"
import { ClientProfileGate } from "@/pages/client/profile/profile-page.model"
import { $sessionsPickerStore, mounted as CoachByIdMounted } from "@/pages/search/coach-by-id/models/units"
import { routeNames } from "@/pages/route-names"
import { mounted as homeMounted } from "@/pages/client/home/home.model.ts"

forward({
  from: finishSaveCardFx.fail.map(({params,error}) => unsuccessfulAddedCard),
  to: [
    toasts.remove,
    toasts.add,
    deletePaymentIdFx.prepend(() => {}),
  ],
})

forward({
  from: finishSaveCardFx.doneData.map(_ => successfulAddedCard),
  to: [
    toasts.remove,
    toasts.add,
    loadInfoFx.prepend(() => {}),
    loadCardsFx.prepend(() => {}),
    deletePaymentIdFx.prepend(() => {}),
  ],
})

startSaveCardFx.doneData.watch((response) => {
  localStorage.setItem("payment_id", response.paymentId)
  window.location.href = response.confirmationUrl
  return
})

forward({
  from: [ClientProfileGate.open, CoachByIdMounted, homeMounted],
  to: getPaymentIdFx,
})

forward({
  from: [
    ClientProfileGate.open.map(() => routeNames.clientProfile()),
    CoachByIdMounted.map((id)=> routeNames.searchCoachPage(id.id.toString())),
    homeMounted.map(() => routeNames.client()),
  ],
  to: setRedirectUrl,
})

guard({
  source: getPaymentIdFx.doneData,
  filter: paymentId => paymentId !== null,
  target: finishSaveCardFx,
})

sample({
  clock: addCard,
  source: $redirectUrl,
  fn: (url, id) => ({
    returnUrl: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}${url}`,
    coach: id
  }),
  target: startSaveCardFx,
})

forward({
  from: finishSaveCardFx.doneData,
  to: attach({
    effect: loadSessionsIdFx,
    mapParams: response => {
      return  response.id
    },
  }),
})

guard({
  source: loadSessionsIdFx.doneData,
  filter: (response) => {
    return response.sessions !== null
  },
  target: $sessionsPickerStore.buySessionBulk.prepend((response: {
    sessions: number[]
    card: number
  }) => {
    return response
  }),
})

