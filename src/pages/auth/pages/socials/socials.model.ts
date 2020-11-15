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
  RegisterAsUserFromSocialsResponse, SocialsDataFound, AuthWithGoogle
} from "@/lib/api/auth-socials"
import { parseQueryString } from "@/lib/helpers/query"
import { createGate } from "@/scope"

type SocialNetworkNameType = "vk" | "google" | "facebook" | null
type SocialNetwork = {
  accessToken: string
  name: SocialNetworkNameType
  email: string
}

export const SOCIAL_NETWORK_SAVE_KEY = "__social-data__"

export const signUpWithSocialsPageGate = createGate()
export const socialsGate = createGate()

export const authWithSocialNetwork = createEvent<string>()
export const registerStep3FormSubmitted = createEvent()
export const userFound = createEvent<{
  token: string
  user: SocialsDataFound
}>()
export const userNotFound = createEvent<RegisterAsUserFromSocialsResponseNotFound>()
const reset = createEvent()

const getEmailAndTokenFx = createEffect({
  handler:  () => {
    try {
      const token: string = parseQueryString<{ search?: string }>(location.hash)["#access_token"]
      const email: string = parseQueryString<{ search?: string }>(location.hash)["email"] || ""
      // @ts-ignore
      const socialNetwork: "vk" | "google" | "facebook" | null  = localStorage.getItem(SOCIAL_NETWORK_SAVE_KEY).replace(/\"/g, '')
      if (socialNetwork === "google"){
        const token: string = parseQueryString<{ search?: string }>(location.hash)["id_token"]
        return {
          accessToken: token,
          name: socialNetwork,
          email: email,
        }
      }

      return {
        accessToken: token,
        name: socialNetwork,
        email: email,
      }
    } catch (e) {
      return {
        accessToken: "",
        name: null,
        email: "",
      }
    }
  },
})

export const $socialNetwork = createStoreObject<SocialNetwork>({
  accessToken: "",
  name: null,
  email: "",
})
  .on(getEmailAndTokenFx.doneData, (state, payload) =>
    ({ name: payload.name, accessToken: payload.accessToken, email: payload.email}))
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

export const registerWithGoogleFx = createEffect<string, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (accessToken) => AuthWithGoogle({accessToken: accessToken}),
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


const deleteSocialNetworkNameFx = createEffect({
  handler: () => localStorage.removeItem(SOCIAL_NETWORK_SAVE_KEY)
})

forward({
  from: signUpWithSocialsPageGate.open,
  to: getEmailAndTokenFx,
})


forward({
  from: authWithSocialNetwork,
  to: saveSocialNetworkNameFx,
})

const merged = merge([registerWithVkFx.doneData, registerWithFacebookFx.doneData, registerWithGoogleFx.doneData])

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
  from: [step3Gate.close, socialsGate.open],
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
