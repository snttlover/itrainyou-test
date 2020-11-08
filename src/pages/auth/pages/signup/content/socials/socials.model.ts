import { loggedInWithSocials, loggedIn } from "@/feature/user/user.model"
import {
  registerAsUserFromFacebook,
  createrUserFromSocials,
  RegisterAsUserFromSocialsResponseFound,
  RegisterAsUserFromSocialsResponseNotFound,
  CreateUserWithSocialsResponse,
} from "@/lib/api/register"
import { UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigatePush } from "@/feature/navigation"
import { userDataSetWithSocials, SocialsDataFound } from "@/pages/auth/pages/signup/signup.model"
import { routeNames } from "@/pages/route-names"
import { AxiosError } from "axios"
import { combine, createEffect, createEvent, createStoreObject, guard,
  forward, sample, split, createStore, Event, Store } from "effector-root"
import { $email, step3Gate } from "@/pages/auth/pages/signup/content/step-3/step3.model"
export const LOGGED_IN_WITH_SOCIALS = "__social-data__"


export const mounted = createEvent<string>()
export const logInWithSocials = createEvent<string>()
export const nextonClick = createEvent()
export const userFound = createEvent<{
    token : string
    user : SocialsDataFound
  }>()
export const userNotFound = createEvent<RegisterAsUserFromSocialsResponseNotFound>()
const reset = createEvent()

export const $social = createStore<"vk" | "facebook" | "google" | null>(null).reset(reset)
/*
export const $tokenFB = createStoreObject<{
accessToken: string
expirationTime: string
expiresIn: string}>
({accessToken: "",
expirationTime: "",
expiresIn: "",})
({ ...state, type: payload }))
*/
export const $tokenFB = createStore<string>("")
.on(mounted, (state, payload) => payload["#access_token"])
.reset(reset)

export const $socialsForm = combine({
  accessToken: $tokenFB,
  email: $email,
  socialNetwork: $social,
}).reset(reset)



const reportUnknownTypeFx = createEffect<any, any, AxiosError>({
  handler: (response) => console.log("reportUnknownType",response),
})

export const registerWithFacebookFx = createEffect<string, RegisterAsUserFromSocialsResponseFound | RegisterAsUserFromSocialsResponseNotFound, AxiosError>({
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
      if (!data) return null
      return JSON.parse(data)
    } catch (e) { return null}
  },
})

const deleteSocialsFx = createEffect({
  handler: () => localStorage.removeItem(LOGGED_IN_WITH_SOCIALS)
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


split({
  source: registerWithFacebookFx.doneData,
  match: {
    userfound: response => response.status === `USER_FOUND`,
    usernotfound: response => response.status === `USER_NOT_FOUND`,
  },
  cases: {
    userfound: userFound.prepend((response: RegisterAsUserFromSocialsResponseFound) =>
    ({ token: response.data.token, user: response.data.user})
    ),
    usernotfound: userNotFound,
    __: reportUnknownTypeFx,
  },
})

forward({
  from: userNotFound.map(()=> true ),
  to: loggedInWithSocials,
})

forward({
  from: userNotFound.map(() => ({ url: routeNames.signup("2") })),
  to: navigatePush,
})

forward({
  from: userNotFound.map((response:RegisterAsUserFromSocialsResponseNotFound ) => ({ type:"client",clientData: response.data,
  categories: [],
  coachData: { workExperience: "", education: "", description: "", phone: "", photos: [], videoInterview: ""}})),
  to: userDataSetWithSocials,
})


/*
forward({
  from: registerWithFacebookFx.done.map(()=> true ),
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
*/

guard({
  source: $tokenFB.updates,
  filter: token => token.length > 0,
  target: registerWithFacebookFx,
})

forward({
  from: step3Gate.close,
  to:[deleteSocialsFx,reset]
})

forward({
  from: createrUserFromSocialsFx.doneData.map(data => ({ token: data.token })),
  to: loggedIn,
})

forward({
  from: createrUserFromSocialsFx.done.map(()=> false ),
  to: loggedInWithSocials,
})

forward({
  from: createrUserFromSocialsFx.doneData.map(() => ({ url: routeNames.signup("4") })),
  to: navigatePush,
})

 sample({
   source: $socialsForm,
   clock: guard({
     source: nextonClick,
     filter: combine($social, (socials) => socials === null ? false : true),
   }),
   target: createrUserFromSocialsFx,
 })

 sample({
   source: combine({ url: routeNames.signup("4") }) ,
   clock: guard({
     source: nextonClick,
     filter: combine($social, (socials) => socials === null ? true : false),
   }),
   target: navigatePush,
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
