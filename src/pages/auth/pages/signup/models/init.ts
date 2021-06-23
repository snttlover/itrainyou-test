import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { combine, forward, guard, sample } from "effector-root"
import { $isSocialSignupInProgress, $isLoggedIn } from "@/feature/user/user.model"
import { $socialsForm, createUserFromSocialsFx } from "@/pages/auth/pages/socials/models/units"
import { REGISTER_SAVE_KEY } from "@/pages/auth/pages/signup/models/types"
import {
  $userData, categoriesChanged, clientDataChanged, coachDataChanged,
  getMyUserDataFx,
  loadDataFx,
  registerStep4Merged,
  registerUserFx,
  saveDataFx,
  signUpPageMounted, userDataChanged, userDataReset, userDataSetWithSocials,
  userType, userTypeChanged, getPriceRangesFx, priceRangesGate,
  $priceRanges, selectPriceRange, $rangeSelected
} from "@/pages/auth/pages/signup/models/units"
import ym from "react-yandex-metrika"

$userData.on(userTypeChanged, (state, payload) => ({ ...state, type: payload }))
  .on(clientDataChanged, (state, payload) => ({ ...state, clientData: payload }))
  .on(coachDataChanged, (state, payload) => ({ ...state, coachData: payload }))
  .on(categoriesChanged, (state, payload) => ({ ...state, categories: payload }))
  .on(userDataChanged, (_, payload) => payload)
  .on(userDataSetWithSocials, (_, payload) => payload)
  .on($priceRanges, (state, payload) => {
    const prices = payload.filter(item => item.selected).map(item => item.id)
    return {...state, clientData: {...state.clientData, priceRanges: prices}}
  })
  .reset(userDataReset)

$priceRanges.on(getPriceRangesFx.doneData,(state,payload) => payload.map((option: {
  id: number
  rangeFrom: number
  rangeTo: number
  selected?: boolean
}) =>
  ({...option, selected: false})))
  .on(selectPriceRange, (state,payload) => {
    const newState = [...state]
    const currentElementID = newState.findIndex(item => item.id === payload.id)
    newState[currentElementID] = {...newState[currentElementID], selected: !newState[currentElementID].selected}
    return newState
  })

$rangeSelected.on($priceRanges, (state, payload) => {
  const selected = payload.filter(range => range.selected)
  return selected.length > 0
})

forward({
  from: $userData.updates,
  to: saveDataFx,
})

forward({ from: loadDataFx.doneData, to: $userData })

forward({ from: signUpPageMounted, to: loadDataFx })

forward({ from: registerUserFx.done, to: getMyUserDataFx })

registerUserFx.done.watch(_ => {
  localStorage.removeItem(REGISTER_SAVE_KEY)
})

forward({
  from: userType.client.map(() => ({ url: routeNames.client() })),
  to: navigatePush,
})

forward({
  from: userType.coach.map(() => ({ url: routeNames.coach() })),
  to: navigatePush,
})

sample({
  source: $userData,
  clock: guard({
    source: registerStep4Merged,
    filter: combine($isSocialSignupInProgress, (inProgress) => !inProgress),
  }),
  target: registerUserFx,
})

registerUserFx.done.map(_ => ym("reachGoal","formsignin"))

sample({
  source: $socialsForm,
  clock: guard({
    source: registerStep4Merged,
    filter: combine($isSocialSignupInProgress, (inProgress) => inProgress),
  }),
  target: createUserFromSocialsFx,
})

sample({
  source: $userData,
  clock: $isLoggedIn.updates,
  target: registerUserFx,
})

forward({
  from: priceRangesGate.open,
  to: getPriceRangesFx,
})