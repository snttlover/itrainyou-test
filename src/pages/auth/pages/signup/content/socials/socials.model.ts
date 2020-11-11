import { loggedInWithSocials, loggedIn } from "@/feature/user/user.model"
import {
  registerAsUserFromFacebook,
  registerAsUserFromVk,
  createrUserFromSocials,
  RegisterAsUserFromSocialsResponseFound,
  RegisterAsUserFromSocialsResponseNotFound,
  CreateUserWithSocialsResponse,
} from "@/lib/api/register"
import { UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigatePush } from "@/feature/navigation"
import { userDataSetWithSocials, SocialsDataFound, UserData } from "@/pages/auth/pages/signup/signup.model"
import { routeNames } from "@/pages/route-names"
import { AxiosError } from "axios"
import {
  combine, createEffect, createEvent, guard,
  forward, sample, split, createStore, createStoreObject, merge
} from "effector-root"
import { $email, step3Gate } from "@/pages/auth/pages/signup/content/step-3/step3.model"

export const LOGGED_IN_WITH_SOCIALS = "__social-data__"


export const mounted = createEvent<{
  token: string
  socialNetwork: string | null
}>()
export const logInWithSocials = createEvent<string>()
export const nextonClick = createEvent()
export const userFound = createEvent<{
  token: string
  user: SocialsDataFound
}>()
export const userNotFound = createEvent<RegisterAsUserFromSocialsResponseNotFound>()
const reset = createEvent()

export const $socialNetworkName = createStore<"vk" | "facebook" | "google" | null>(null).reset(reset)

export const $token = createStoreObject<{
    accessToken: string
    socialNetwork: string | null}>
    ({accessToken: "",socialNetwork: null})
    .on(mounted, (state, payload) => ({ socialNetwork: payload.socialNetwork, accessToken: payload.token}))
    .reset(reset)


//({ ...state, type: payload })
/*export const $token = createStore<string>("")
  .on(mounted, (state, payload) => payload)
  .reset(reset)*/

export const $socialsForm = combine($token, $email,$socialNetworkName, (token, mail,networkName) =>({
  accessToken: token.accessToken, email: mail, socialNetwork: networkName,
})).reset(reset)


const reportUnknownTypeFx = createEffect<any, any, AxiosError>({
  handler: (response) => console.log("reportUnknownType", response),
})

export const registerWithFacebookFx = createEffect<string, RegisterAsUserFromSocialsResponseFound | RegisterAsUserFromSocialsResponseNotFound, AxiosError>({
  handler: (accessToken) => registerAsUserFromFacebook({ access_token: accessToken }),
})

export const registerWithVkFx = createEffect<string, RegisterAsUserFromSocialsResponseFound | RegisterAsUserFromSocialsResponseNotFound, AxiosError>({
  handler: (accessToken) => registerAsUserFromVk({ access_token: accessToken }),
})

export const registerWithGoogleFx = createEffect<string, any, AxiosError>({
  handler: (accessToken) => console.log,
})

export const createUserFromSocialsFx = createEffect<UnpackedStoreObjectType<typeof $socialsForm>, CreateUserWithSocialsResponse, AxiosError>({
  handler: ({ accessToken, email, socialNetwork }) => createrUserFromSocials({ accessToken, email, socialNetwork }),
})

const saveSocialsFx = createEffect({
  handler: (socials: string | null) => {
    try {
      const data = JSON.stringify(socials)
      localStorage.setItem(LOGGED_IN_WITH_SOCIALS, data)
    } catch (e) {
    }
  },
})

export const loadSocialsFx = createEffect({
  handler: () => {
    try {
      const data = localStorage.getItem(LOGGED_IN_WITH_SOCIALS)
      if (!data) return null
      return JSON.parse(data)
    } catch (e) {
      return null
    }
  },
})

const deleteSocialsFx = createEffect({
  handler: () => localStorage.removeItem(LOGGED_IN_WITH_SOCIALS)
})

forward({
  from: [registerWithFacebookFx.done,registerWithVkFx.done],
  to: loadSocialsFx,
})

forward({
  from: loadSocialsFx.doneData,
  to: $socialNetworkName,
})


forward({
  from: logInWithSocials,
  to: saveSocialsFx,
})

const merged = merge([registerWithVkFx.doneData,registerWithFacebookFx.doneData])

split({
  source: merged,
  match: {
    userFound: response => response.status === "USER_FOUND",
    userNotFound: response => response.status === "USER_NOT_FOUND",
  },
  cases: {
    userFound: userFound.prepend((response: RegisterAsUserFromSocialsResponseFound) =>
      ({ token: response.data.token, user: response.data.user })
    ),
    userNotFound: userNotFound,
    __: reportUnknownTypeFx,
  },
})

forward({
  from: userNotFound.map(() => true),
  to: loggedInWithSocials,
})

forward({
  from: userNotFound.map(() => ({ url: routeNames.signup("2") })),
  to: navigatePush,
})

forward({
  from: userNotFound.map((response: RegisterAsUserFromSocialsResponseNotFound): UserData => ({
    type: "client",
    clientData: response.data,
    categories: [],
    coachData: {
      workExperience: "",
      education: "",
      description: "",
      phone: "",
      photos: [],
      videoInterview: ""
    }
  })),
  to: userDataSetWithSocials,
})

/*guard({
  source: $token.updates,
  filter: token => token.length > 0,
  target: registerWithFacebookFx,
})*/

const socialregister = guard({
  source: $token.updates,
  filter: response => response.accessToken.length > 0,
})

split({
  source: socialregister,
  match: {
    vK: response => response.socialNetwork === `"vk"`,
    faceBook: response => response.socialNetwork === `"facebook"`,
    google: response => response.socialNetwork === `"google"`,
  },
  cases: {
    vK: registerWithVkFx.prepend((response: {accessToken: string
          socialNetwork: string | null}) => response.accessToken),

    faceBook: registerWithFacebookFx.prepend((response: {accessToken: string
          socialNetwork: string | null}) => response.accessToken),

    google: registerWithGoogleFx.prepend((response: {accessToken: string
          socialNetwork: string | null}) => response.accessToken),
    __: reportUnknownTypeFx,
  },
})

forward({
  from: step3Gate.close,
  to: [deleteSocialsFx, reset]
})

forward({
  from: createUserFromSocialsFx.doneData.map(data => ({ token: data.token })),
  to: loggedIn,
})

forward({
  from: createUserFromSocialsFx.done.map(() => false),
  to: loggedInWithSocials,
})

forward({
  from: createUserFromSocialsFx.doneData.map(() => ({ url: routeNames.signup("4") })),
  to: navigatePush,
})

sample({
  source: $socialsForm,
  clock: guard({
    source: nextonClick,
    filter: combine($socialNetworkName, (socials) => socials !== null),
  }),
  target: createUserFromSocialsFx,
})

sample({
  source: combine({ url: routeNames.signup("4") }),
  clock: guard({
    source: nextonClick,
    filter: combine($socialNetworkName, (socials) => socials === null),
  }),
  target: navigatePush,
})


saveSocialsFx.watch(response => {
  console.log("SAVED SOCIALS DONE", response)
})

registerWithFacebookFx.done.watch(response => {
  console.log("REGISTER DONE", response)
})

registerWithFacebookFx.doneData.map(response => response).watch(response => {
  console.log("REGISTER DONE DATA", response)
})

registerWithVkFx.doneData.map(response => response).watch(response => {
  console.log("REGISTER with VK DONE DATA", response)
})

createUserFromSocialsFx.doneData.map(response => response).watch(response => {
  console.log("CREATE uSER FROM SOCIALS DONE DATA", response)
})

loadSocialsFx.doneData.watch(response => {
  console.log("chto v hranilishe", response)
})

$token.watch(response => {
  console.log("chto v $token", response)
})
