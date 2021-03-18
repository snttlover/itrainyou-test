import { attach, forward, guard, sample, split } from "effector-root"
import {
  $redirectUrl,
  addCard,
  deletePaymentIdFx,
  finishSaveClientCardFx,
  finishSaveCoachCardFx,
  getPaymentIdFx,
  loadSessionsIdFx,
  setRedirectUrl,
  startSaveClientCardFx,
  startSaveCoachCardFx,
  successfulAddedCard,
  unsuccessfulAddedCard,
  PAYMENT_KEY
} from "@/feature/client-funds-up/dialog/models/units"
import { toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { loadClientCardsFx } from "@/pages/client/wallet/cards/cards.model"
import { ClientProfileGate } from "@/pages/client/profile/profile-page.model"
import { $sessionsPickerStore, mounted as CoachByIdMounted } from "@/pages/search/coach-by-id/models/units"
import { routeNames } from "@/pages/route-names"
import { mounted as homeMounted } from "@/pages/client/home/home.model.ts"
import { CoachHomeGate } from "@/pages/coach/home/sessions/coach-sessions-page.model"

forward({
  from: [
    finishSaveClientCardFx.fail.map(({params,error}) => unsuccessfulAddedCard),
    finishSaveCoachCardFx.fail.map(({params,error}) => unsuccessfulAddedCard)
  ],
  to: [
    toasts.remove,
    toasts.add,
    deletePaymentIdFx.prepend(() => {}),
  ],
})

forward({
  from: [
    finishSaveClientCardFx.doneData.map(_ => successfulAddedCard),
    finishSaveCoachCardFx.doneData.map(_ => successfulAddedCard)
  ],
  to: [
    toasts.remove,
    toasts.add,
    loadClientCardsFx.prepend(() => {}),
    deletePaymentIdFx.prepend(() => {}),
  ],
})

startSaveClientCardFx.doneData.watch((response) => {
  const data  = JSON.stringify({paymentId: response.paymentId, type: "client"})
  localStorage.setItem(PAYMENT_KEY, data)
  window.location.href = response.confirmationUrl
  return
})

startSaveCoachCardFx.doneData.watch((response) => {
  const data  = JSON.stringify({paymentId: response.paymentId, type: "coach"})
  localStorage.setItem(PAYMENT_KEY, data)
  window.location.href = response.confirmationUrl
  return
})

/*
const stringData = localStorage.getItem(REGISTER_SAVE_KEY)
    return JSON.parse(stringData!).clientData
 */

/*
const data = JSON.stringify(socialNetworkName)
    localStorage.setItem(SOCIAL_NETWORK_SAVE_KEY, data)
 */

forward({
  from: [ClientProfileGate.open, CoachByIdMounted, homeMounted,CoachHomeGate.open],
  to: getPaymentIdFx,
})

forward({
  from: [
    ClientProfileGate.open.map(() => routeNames.clientProfile()),
    CoachByIdMounted.map((id)=> routeNames.searchCoachPage(id.id.toString())),
    homeMounted.map(() => routeNames.client()),
    CoachHomeGate.open.map(() => routeNames.coach()),
  ],
  to: setRedirectUrl,
})

/*guard({
  source: getPaymentIdFx.doneData,
  filter: paymentId => paymentId !== null,
  target: finishSaveCardFx,
})*/

split({
  source: getPaymentIdFx.doneData,
  match: {
    client: payload => payload.type === "client",
    coach: payload => payload.type === "coach",
  },
  cases: {
    client: finishSaveClientCardFx,
    coach: finishSaveCoachCardFx,
  }
})

/*sample({
  clock: addCard,
  source: $redirectUrl,
  fn: (url, id) => (id ? {
    returnUrl: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}${url}`,
    coach: id
  } : {returnUrl: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}${url}`,}),
  target: startSaveCardFx,
})*/

const splitAddCard = sample({ 
  clock: addCard,
  source: $redirectUrl,
  fn: (url, id) => (id ? {
    returnUrl: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}${url}`,
    coach: id
  } : {returnUrl: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}${url}`,}),
})

const userType = split(splitAddCard, {
  client: payload => !!payload.coach === true,
  coach: payload => !!payload.coach === false,
})

forward({
  from: userType.client,
  to: startSaveClientCardFx,
})

forward({
  from: userType.coach,
  to: startSaveCoachCardFx,
})

/*split({
  source: addCard,
  match: {
    client: payload => !!payload === true,
    coach: payload => !payload === true,
  },
  cases: {
    client: startSaveClientCardFx,
    coach: startSaveCoachCardFx,
  }
})*/

forward({
  from: finishSaveClientCardFx.doneData,
  to: attach({
    effect: loadSessionsIdFx,
    mapParams: response => {
      return  response.id
    },
  }),
})

/*guard({
  source: finishSaveClientCardFx.doneData,
  filter: response => !!response,
  target: attach({
    effect: loadSessionsIdFx,
    mapParams: (response: FinishSaveClientCardResponse) => {
      return  response.id
    },
  }),
})*/

/*split({
  source: finishSaveCardFx.doneData,
  match: {
    client: (response) => !!response,
    coach: (response) => !response,  
  },
  cases: {
    client: attach({
      effect: loadSessionsIdFx,
      mapParams: response => {
        return  response.id
      },
    }),  
    coach: console.log,
  }
})*/

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

