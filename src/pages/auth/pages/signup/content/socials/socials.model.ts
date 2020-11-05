import { loggedIn } from "@/feature/user/user.model"
import { registerAsUserFromSocials, RegisterAsUserFromSocialsResponse,RegisterWithSocialsRequest } from "@/lib/api/register"
import { navigatePush } from "@/feature/navigation"
import { userDataReset,userDataSetWithSocials } from "@/pages/auth/pages/signup/signup.model"
import { routeNames } from "@/pages/route-names"
import { createGate } from "@/scope"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, forward, sample, createStore, Event, Store } from "effector-root"


export const mounted = createEvent<string>()
export const $tokenFB = createStoreObject<{
accessToken: string
expirationTime: string
expiresIn: string}>
({accessToken: "",
expirationTime: "",
expiresIn: "",})

export const registerWithFacebookFx = createEffect<typeof $tokenFB, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: ({accessToken}) => registerAsUserFromSocials({access_token: accessToken}),
})

forward({
  from: registerWithFacebookFx.done.map(response => ({ token: response.params })),
  to: loggedIn,
})

forward({
  from: registerWithFacebookFx.doneData.map(() => ({ url: routeNames.signup("2") })),
  to: navigatePush,
})

forward({
  from: registerWithFacebookFx.doneData.map(response => ({ type:"client",clientData: response.data,
  coachData: { description: "", education: "", phone: "", videoInterview: "", workExperience: "", photos: [] },
  categories: [],  })),
  to: userDataSetWithSocials,
})

/*forward({
  from: registerWithFacebookFx.doneData,
  to: userDataReset,
})*/


$tokenFB.on(mounted, (state, payload) => ({ ...state,
accessToken: payload["#access_token"],
expirationTime: payload["data_access_expiration_time"],
expiresIn: payload["expires_in"],
 })).watch(response => {
   console.log("TOKENFB updates",response)
 })

 forward({
   from: $tokenFB.updates,
   to: registerWithFacebookFx,
 })

registerWithFacebookFx.done.watch(response => {
  console.log("REGISTER DONE",response)
})

registerWithFacebookFx.doneData.map(response => response).watch(response => {
  console.log("REGISTER DONE DATA",response)
})
 /*registerWithFacebookFx.doneData.map(response => response).watch(data => {
   console.log("NICE OTVET",data)
 })*/
