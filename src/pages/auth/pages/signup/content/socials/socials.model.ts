import { loggedIn } from "@/feature/user/user.model"
import { registerAsUserFromSocials, RegisterAsUserFromSocialsResponse, } from "@/lib/api/register"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigatePush } from "@/feature/navigation"
import { emailValidator, passwordValidator, trimString } from "@/lib/validators"
import { userDataReset,userDataSetWithSocials } from "@/pages/auth/pages/signup/signup.model"
import { routeNames } from "@/pages/route-names"
import { createGate } from "@/scope"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, forward, sample } from "effector-root"


export const mounted = createEvent()
export const sendToken = createEvent()
export const registerWithSocialsFx = createEffect<any, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (access_token) => registerAsUserFromSocials({access_token: access_token}),
})

/*forward({
  from: registerFromSocialsFx.doneData.map(data => ({ token: data.token })),
  to: loggedIn,
})

forward({
  from: registerFromSocialsFx.doneData.map(() => ({ url: routeNames.signup("2") })),
  to: navigatePush,
})*/

forward({
  from: mounted,
  to: registerWithSocialsFx,
})

registerWithSocialsFx.done.watch(response => {
  console.log("NICE OTVET",response)
})
