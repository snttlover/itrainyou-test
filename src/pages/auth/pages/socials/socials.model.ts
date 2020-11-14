import { setIsSocialSignupInProgress, loggedIn } from "@/feature/user/user.model"
import { UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigatePush } from "@/feature/navigation"
import { userDataSetWithSocials, UserData } from "@/pages/auth/pages/signup/signup.model"
import { routeNames } from "@/pages/route-names"
import { AxiosError } from "axios"
import {
  combine, createEffect, createEvent, guard,
  forward, sample, split, createStoreObject, merge
} from "effector-root"
import { $email, step3Gate } from "@/pages/auth/pages/signup/content/step-3/step3.model"
import {
  AuthWithFB,
  AuthWithVK,
  createUserFromSocials, CreateUserWithSocialsResponse,
  RegisterAsUserFromSocialsResponseFound, RegisterAsUserFromSocialsResponseNotFound,
  RegisterAsUserFromSocialsResponse, SocialsDataFound
} from "@/lib/api/auth-socials"


type SocialNetworkNameType = "vk" | "google" | "facebook" | null
type SocialNetwork = {
  accessToken: string
  name: SocialNetworkNameType
  email: string
}

export const SOCIAL_NETWORK_SAVE_KEY = "__social-data__"


export const signUpWithSocialsPageMounted = createEvent<{
  token: string
  socialNetwork: SocialNetworkNameType
  email: string
}>()

export const authWithSocialNetwork = createEvent<string>()
export const registerStep3FormSubmitted = createEvent()
export const userFound = createEvent<{
  token: string
  user: SocialsDataFound
}>()
export const userNotFound = createEvent<RegisterAsUserFromSocialsResponseNotFound>()
const reset = createEvent()


export const $socialNetwork = createStoreObject<SocialNetwork>({
  accessToken: "",
  name: null,
  email: "",
})
  .on(signUpWithSocialsPageMounted, (state, payload) =>
    ({ name: payload.socialNetwork, accessToken: payload.token, email: payload.email}))
  .reset(reset)


export const $socialsForm = combine($socialNetwork, $email, (token, email) =>({
  accessToken: token.accessToken, email: email, socialNetwork: token.name,
})).reset(reset)


const reportUnknownTypeFx = createEffect<any, any, AxiosError>({
  handler: (response) => console.log("reportUnknownType", response),
})

export const registerWithFacebookFx = createEffect<string, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (accessToken) => AuthWithFB({ accessToken: accessToken }),
})

export const registerWithVkFx = createEffect<string, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (accessToken) => AuthWithVK({ accessToken: accessToken }),
})

export const registerWithGoogleFx = createEffect<string, any, AxiosError>({
  handler: (accessToken) => console.log,
})

export const createUserFromSocialsFx = createEffect<UnpackedStoreObjectType<typeof $socialsForm>, CreateUserWithSocialsResponse, AxiosError>({
  handler: ({ accessToken, email, socialNetwork }) => createUserFromSocials({ accessToken, email, socialNetwork }),
})

const saveSocialNetworkNameFx = createEffect({
  handler: (socialNetworkName: string | null) => {
    try {
      const data = JSON.stringify(socialNetworkName)
      localStorage.setItem(SOCIAL_NETWORK_SAVE_KEY, data)
      // eslint-disable-next-line no-empty
    } catch (e) {
    }
  },
})

export const loadSocialNetworkNameFx = createEffect({
  handler: () => {
    try {
      const data = localStorage.getItem(SOCIAL_NETWORK_SAVE_KEY)
      if (!data) return
      return JSON.parse(data)
    } catch (e) {}
  },
})

const deleteSocialNetworkNameFx = createEffect({
  handler: () => localStorage.removeItem(SOCIAL_NETWORK_SAVE_KEY)
})


forward({
  from: authWithSocialNetwork,
  to: saveSocialNetworkNameFx,
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
  to: setIsSocialSignupInProgress,
})

forward({
  from: userNotFound.map(() => ({ url: routeNames.signup("2") })),
  to: navigatePush,
})

sample({
  source: $socialNetwork,
  clock: userNotFound,
  fn: (socialNetwork: SocialNetwork, response: RegisterAsUserFromSocialsResponseNotFound): UserData => {
    const email = response.data.email || socialNetwork.email
    return {
      type: "client",
      clientData: { ...response.data, email },
      categories: [],
      coachData: {
        workExperience: "",
        education: "",
        description: "",
        phone: "",
        photos: [],
        videoInterview: ""
      }
    }
  },
  target: userDataSetWithSocials,
})


const socialNetworkGuardedUpdated = guard({
  source: $socialNetwork.updates,
  filter: socialNetwork => socialNetwork.accessToken  !== null,
})


split({
  source: socialNetworkGuardedUpdated,
  match: {
    vK: socialNetwork => socialNetwork.name === "vk",
    faceBook: socialNetwork => socialNetwork.name === "facebook",
    google: socialNetwork => socialNetwork.name === "google",
  },
  cases: {
    vK: registerWithVkFx.prepend((socialNetwork: SocialNetwork) => socialNetwork.accessToken),

    faceBook: registerWithFacebookFx.prepend((socialNetwork: SocialNetwork) => socialNetwork.accessToken),

    google: registerWithGoogleFx.prepend((socialNetwork: SocialNetwork) => socialNetwork.accessToken),
    __: reportUnknownTypeFx,
  },
})

forward({
  from: step3Gate.close,
  to: [deleteSocialNetworkNameFx, reset]
})

forward({
  from: createUserFromSocialsFx.doneData.map(data => ({ token: data.token })),
  to: loggedIn,
})

forward({
  from: createUserFromSocialsFx.done.map(() => false),
  to: setIsSocialSignupInProgress,
})

forward({
  from: createUserFromSocialsFx.doneData.map(() => ({ url: routeNames.signup("4") })),
  to: navigatePush,
})

sample({
  source: $socialsForm,
  clock: guard({
    source: registerStep3FormSubmitted,
    filter: combine($socialNetwork, (socials) => socials.name !== null),
  }),
  target: createUserFromSocialsFx,
})

sample({
  source: combine({ url: routeNames.signup("4") }),
  clock: guard({
    source: registerStep3FormSubmitted,
    filter: combine($socialNetwork, (socials) => socials.name === null),
  }),
  target: navigatePush,
})


saveSocialNetworkNameFx.watch(response => {
  console.log("SAVED SOCIALS DONE", response)
})

registerWithFacebookFx.done.watch(response => {
  console.log("REGISTER with FB DONE", response)
})

registerWithVkFx.doneData.map(response => response).watch(response => {
  console.log("REGISTER with VK DONE DATA", response)
})

createUserFromSocialsFx.doneData.map(response => response).watch(response => {
  console.log("CREATE uSER FROM SOCIALS DONE DATA", response)
})


$socialNetwork.watch(response => {
  console.log("chto v $socialNetwork", response)
})
