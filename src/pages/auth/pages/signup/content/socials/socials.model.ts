import { loggedInWithSocials } from "@/feature/user/user.model"
import {
  registerAsUserFromFacebook,
  createrUserFromSocials,
  RegisterAsUserFromSocialsResponse,
  RegisterWithSocialsRequest,
  CreateUserWithSocialsResponse,
} from "@/lib/api/register"
import { createEffectorField, UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigatePush } from "@/feature/navigation"
import { userDataSetWithSocials } from "@/pages/auth/pages/signup/signup.model"
import { routeNames } from "@/pages/route-names"
import { createGate } from "@/scope"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, forward, sample, createStore, Event, Store } from "effector-root"
import { $email } from "@/pages/auth/pages/signup/content/step-3/step3.model"
export const LOGGED_IN_WITH_SOCIALS = "__social-data__"


export const mounted = createEvent<string>()
export const logInWithSocials = createEvent<string>()
export const nextonClick = createEvent<any>()

export const $social = createStore<string>("")
/*export const $tokenFB = createStoreObject<{
accessToken: string
expirationTime: string
expiresIn: string}>
({accessToken: "",
expirationTime: "",
expiresIn: "",})*/
export const $tokenFB = createStore<string>("")
export const $socialsForm = combine({
  accessToken: $tokenFB,
  email: $email,
  socialNetwork: $social,
})

export const registerWithFacebookFx = createEffect<string, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (accessToken) => registerAsUserFromFacebook({access_token: accessToken}),
})

export const createrUserFromSocialsFx = createEffect<UnpackedStoreObjectType<typeof $socialsForm>,CreateUserWithSocialsResponse, AxiosError>({
  handler: ({accessToken,email,socialNetwork}) => createrUserFromSocials({accessToken,email,socialNetwork}),
})

const saveSocialsFx = createEffect({
  handler: (socials: string | null) => {
    try {
      const data = JSON.stringify(socials)
      localStorage.setItem(LOGGED_IN_WITH_SOCIALS, data)
    } catch (e) {}
  },
})

const loadSocialsFx = createEffect({
  handler: () => {
    try {
      const data = localStorage.getItem(LOGGED_IN_WITH_SOCIALS)
      if (!data) return ""
      return JSON.parse(data)
    } catch (e) { return ""}
  },
})

forward({
  from: registerWithFacebookFx.done,
  to: loadSocialsFx,
})

forward({
  from: loadSocialsFx.doneData,
  to: $social,
})


forward({
  from: logInWithSocials,
  to: saveSocialsFx,
})

forward({
  from: registerWithFacebookFx.done.map(response=> true),
  to: loggedInWithSocials,
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


/*$tokenFB.on(mounted, (state, payload) => ({ ...state,
accessToken: payload["#access_token"],
expirationTime: payload["data_access_expiration_time"],
expiresIn: payload["expires_in"],
 })).watch(response => {
   console.log("TOKENFB updates",response)
 })*/


 $tokenFB.on(mounted, (state, payload) => payload["#access_token"]).watch(response => {
    console.log("TOKENFB updates",response)
  })

 forward({
   from: $tokenFB.updates,
   to: registerWithFacebookFx,
 })

saveSocialsFx.watch(response => {
  console.log("SAVED SOCIALS DONE",response)
})

registerWithFacebookFx.done.watch(response => {
  console.log("REGISTER DONE",response)
})

registerWithFacebookFx.doneData.map(response => response).watch(response => {
  console.log("REGISTER DONE DATA",response)
})

createrUserFromSocialsFx.doneData.map(response => response).watch(response => {
  console.log("CREATE uSER FROM SOCIALS DONE DATA",response)
})

loadSocialsFx.doneData.watch(response => {
  console.log("chto v hranilishe",response)
})
 /*registerWithFacebookFx.doneData.map(response => response).watch(data => {
   console.log("NICE OTVET",data)
 })*/

 sample({
   source: $socialsForm,
   clock: nextonClick,
   target: createrUserFromSocialsFx,
 })
