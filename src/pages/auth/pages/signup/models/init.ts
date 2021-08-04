import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { combine, forward, guard, sample } from "effector-root"
import { $isLoggedIn, $isSocialSignupInProgress } from "@/feature/user/user.model"
import { $socialsForm, createUserFromSocialsFx } from "@/pages/auth/pages/socials/models/units"
import { REGISTER_SAVE_KEY } from "@/pages/auth/pages/signup/models/types"
import {
  $coachToRedirectAfterSignUp,
  $priceRanges,
  $rangeSelected,
  $registerUserData,
  categoriesChanged,
  clientDataChanged,
  coachDataChanged,
  getMyUserDataFx,
  getPriceRangesFx,
  priceRangesGate,
  registerStep4Merged,
  registerUserFx,
  selectPriceRange,
  setRedirectToCoachAfterSignUp,
  signUpPageMounted,
  userDataChanged,
  userDataReset,
  userDataSetWithSocials,
  userType,
  userTypeChanged
} from "@/pages/auth/pages/signup/models/units"
import { ymLog } from "@/lib/external-services/yandex-metrika/lib"
import { coachByIdGate } from "@/pages/search/coach-by-id/models/units"

$coachToRedirectAfterSignUp.on(
  setRedirectToCoachAfterSignUp,
  (state, payload) => payload
).reset(coachByIdGate.close)

$registerUserData.on(userTypeChanged, (state, payload) => ({ ...state, type: payload }))
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

forward({ from: registerUserFx.done, to: getMyUserDataFx })

// ToDo: закомментил, т.к. сейчас роутинг после регистрации происходит в компоненте SignUpPage.tsx
// // Если клиент регистрировался через бронирование сессии на лендинге,
// // то перенаправляем его на страничку коуча, у которого он хотел забронировать сессию
// sample({
//   source: $coachToRedirectAfterSignUp.map(
//     (coachToRedirectAfterSignUp) => ({
//       url: routeNames.searchCoachPage(coachToRedirectAfterSignUp as unknown as string),
//       state: { freeSessions: true }
//     })
//   ),
//   clock: guard({
//     source: userType.client,
//     filter: combine(
//       $coachToRedirectAfterSignUp,
//       (coachToRedirectAfterSignUp) => !!coachToRedirectAfterSignUp)
//   }),
//   target: merge([navigatePush, setRedirectToCoachAfterSignUp.prepend(() => null)])
// })
//
// // Если клиент проходил стандартную регистрацию, то перекидываем его на главную страницу клиента
// sample({
//   source: $coachToRedirectAfterSignUp.map(() => ({ url: routeNames.client(), })),
//   clock: guard({
//     source: userType.client,
//     filter: combine(
//       $coachToRedirectAfterSignUp,
//       (coachToRedirectAfterSignUp) => !coachToRedirectAfterSignUp)
//   }),
//   target: navigatePush
// })

forward({
  from: userType.coach.map(() => ({ url: routeNames.coach() })),
  to: navigatePush,
})

sample({
  source: $registerUserData,
  clock: guard({
    source: registerStep4Merged,
    filter: combine($isSocialSignupInProgress, (inProgress) => !inProgress),
  }),
  target: registerUserFx,
})

registerUserFx.done.map(_ => ymLog("reachGoal","formsignin"))

sample({
  source: $socialsForm,
  clock: guard({
    source: registerStep4Merged,
    filter: combine($isSocialSignupInProgress, (inProgress) => inProgress),
  }),
  target: createUserFromSocialsFx,
})

sample({
  source: $registerUserData,
  clock: createUserFromSocialsFx.doneData,
  target: registerUserFx,
})

forward({
  from: priceRangesGate.open,
  to: getPriceRangesFx,
})