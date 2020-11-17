import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { combine, forward, guard, sample } from "effector-root"
import { $isSocialSignupInProgress } from "@/feature/user/user.model"
import { $socialsForm, createUserFromSocialsFx } from "@/pages/auth/pages/socials/models/init"
import { REGISTER_SAVE_KEY } from "@/pages/auth/pages/signup/models/types"
import {
  $userData,
  getMyUserDataFx,
  loadDataFx,
  registerStep4Merged,
  registerUserFx,
  saveDataFx,
  signUpPageMounted,
  userType
} from "@/pages/auth/pages/signup/models/init"


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

/*sample({
  source: $userData,
  clock: registerStep4Merged,
  target: registerUserFx,
})*/

sample({
  source: $userData,
  clock: guard({
    source: registerStep4Merged,
    filter: combine($isSocialSignupInProgress, (inProgress) => !inProgress),
  }),
  target: registerUserFx,
})

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
  clock: createUserFromSocialsFx.done,
  target: registerUserFx,
})