import { loggedInWithSocials, loggedIn } from "@/feature/user/user.model"
import { UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { navigatePush } from "@/feature/navigation"
import { userDataSetWithSocials, SocialsDataFound, UserData } from "@/pages/auth/pages/signup/signup.model"
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
  RegisterAsUserFromSocialsResponseFound, RegisterAsUserFromSocialsResponseNotFound
} from "@/lib/api/auth-socials"

type SocialNetworkNameType = "vk" | "google" | "facebook" | null

export const LOGGED_IN_WITH_SOCIALS = "__social-data__"


export const mounted = createEvent<{
  token: string
  socialNetwork: SocialNetworkNameType
}>()
export const logInWithSocials = createEvent<string>()
export const nextonClick = createEvent()
export const userFound = createEvent<{
  token: string
  user: SocialsDataFound
}>()
export const userNotFound = createEvent<RegisterAsUserFromSocialsResponseNotFound>()
const reset = createEvent()


export const $socialNetwork = createStoreObject<{
    accessToken: string
    nameOfNetwork: SocialNetworkNameType }>({
      accessToken: "",
      nameOfNetwork: null
    })
  .on(mounted, (state, payload) => ({ nameOfNetwork: payload.socialNetwork, accessToken: payload.token}))
  .reset(reset)


export const $socialsForm = combine($socialNetwork, $email, (token, mail) =>({
  accessToken: token.accessToken, email: mail, socialNetwork: token.nameOfNetwork,
})).reset(reset)


const reportUnknownTypeFx = createEffect<any, any, AxiosError>({
  handler: (response) => console.log("reportUnknownType", response),
})

export const registerWithFacebookFx = createEffect<string, RegisterAsUserFromSocialsResponseFound | RegisterAsUserFromSocialsResponseNotFound, AxiosError>({
  handler: (accessToken) => AuthWithFB({ accessToken: accessToken }),
})

export const registerWithVkFx = createEffect<string, RegisterAsUserFromSocialsResponseFound | RegisterAsUserFromSocialsResponseNotFound, AxiosError>({
  handler: (accessToken) => AuthWithVK({ accessToken: accessToken }),
})

export const registerWithGoogleFx = createEffect<string, any, AxiosError>({
  handler: (accessToken) => console.log,
})

export const createUserFromSocialsFx = createEffect<UnpackedStoreObjectType<typeof $socialsForm>, CreateUserWithSocialsResponse, AxiosError>({
  handler: ({ accessToken, email, socialNetwork }) => createUserFromSocials({ accessToken, email, socialNetwork }),
})

const saveSocialsFx = createEffect({
  handler: (socials: string | null) => {
    try {
      const data = JSON.stringify(socials)
      localStorage.setItem(LOGGED_IN_WITH_SOCIALS, data)
      // eslint-disable-next-line no-empty
    } catch (e) {
    }
  },
})


const deleteSocialsFx = createEffect({
  handler: () => localStorage.removeItem(LOGGED_IN_WITH_SOCIALS)
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


const socialNetworkGuardedUpdated = guard({
  source: $socialNetwork.updates,
  filter: socialNetwork => socialNetwork.accessToken  !== null,
})


split({
  source: socialNetworkGuardedUpdated,
  match: {
    vK: socialNetwork => socialNetwork.nameOfNetwork === "vk",
    faceBook: socialNetwork => socialNetwork.nameOfNetwork === "facebook",
    google: socialNetwork => socialNetwork.nameOfNetwork === "google",
  },
  cases: {
    vK: registerWithVkFx.prepend((socialNetwork: {accessToken: string
      nameOfNetwork: SocialNetworkNameType}) => socialNetwork.accessToken),

    faceBook: registerWithFacebookFx.prepend((socialNetwork: {accessToken: string
      nameOfNetwork: SocialNetworkNameType}) => socialNetwork.accessToken),

    google: registerWithGoogleFx.prepend((socialNetwork: {accessToken: string
      nameOfNetwork: SocialNetworkNameType}) => socialNetwork.accessToken),
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
    filter: combine($socialNetwork, (socials) => socials.nameOfNetwork !== null),
  }),
  target: createUserFromSocialsFx,
})

sample({
  source: combine({ url: routeNames.signup("4") }),
  clock: guard({
    source: nextonClick,
    filter: combine($socialNetwork, (socials) => socials.nameOfNetwork === null),
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


$socialNetwork.watch(response => {
  console.log("chto v $token", response)
})
