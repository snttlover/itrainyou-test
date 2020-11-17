import { combine, createEffect, createEvent, createStoreObject } from "effector-root"
import {
  AuthWithFB,
  AuthWithGoogle,
  AuthWithVK,
  createUserFromSocials,
  CreateUserWithSocialsResponse,
  RegisterAsUserFromSocialsResponse,
  RegisterAsUserFromSocialsResponseNotFound,
  SocialsDataFound
} from "@/lib/api/auth-socials"
import { AxiosError } from "axios"
import { $email } from "@/pages/auth/pages/signup/content/step-3/step3.model"
import { UnpackedStoreObjectType } from "@/lib/generators/efffector"
import { createGate } from "@/scope"
import { parseQueryString } from "@/lib/helpers/query"
import { SOCIAL_NETWORK_SAVE_KEY, SocialNetwork, SocialNetworkNameType } from "@/pages/auth/pages/socials/models/types"

export const signUpWithSocialsPageGate = createGate()
export const socialsGate = createGate()
export const authWithSocialNetwork = createEvent<string>()
export const registerStep3FormSubmitted = createEvent()
export const userFound = createEvent<{
  token: string
  user: SocialsDataFound
}>()
export const userNotFound = createEvent<RegisterAsUserFromSocialsResponseNotFound>()
export const reset = createEvent()
export const socialNetworkDataFx = createEffect({
  handler: () => {
    const stringData = localStorage.getItem(SOCIAL_NETWORK_SAVE_KEY)
    const name: SocialNetworkNameType = JSON.parse(stringData!)

    const tokenQueryParamName = name === "google" ? "id_token" : "#access_token"

    const getHashParam = (key: string) => parseQueryString<{ search?: string }>(location.hash)[key] || ""
    const accessToken = getHashParam(tokenQueryParamName)
    const email = getHashParam("email")

    return {
      accessToken,
      name,
      email,
    }
  },
})
export const $socialNetwork = createStoreObject<SocialNetwork>({
  accessToken: "",
  name: null,
  email: "",
})
  .on(socialNetworkDataFx.doneData, (state, payload) =>
    ({ name: payload.name, accessToken: payload.accessToken, email: payload.email }))
  .reset(reset)
export const $socialsForm = combine($socialNetwork, $email, (token, email) => ({
  accessToken: token.accessToken, email: email, socialNetwork: token.name,
})).reset(reset)
export const reportUnknownTypeFx = createEffect<any, any, AxiosError>({
  handler: (response) => console.log("reportUnknownType", response),
})
export const registerWithFacebookFx = createEffect<string, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (accessToken) => AuthWithFB({ accessToken: accessToken }),
})
export const registerWithVkFx = createEffect<string, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (accessToken) => AuthWithVK({ accessToken: accessToken }),
})
export const registerWithGoogleFx = createEffect<string, RegisterAsUserFromSocialsResponse, AxiosError>({
  handler: (accessToken) => AuthWithGoogle({ accessToken: accessToken }),
})
export const createUserFromSocialsFx = createEffect<UnpackedStoreObjectType<typeof $socialsForm>, CreateUserWithSocialsResponse, AxiosError>({
  handler: ({ accessToken, email, socialNetwork }) => createUserFromSocials({ accessToken, email, socialNetwork }),
})
export const saveSocialNetworkNameFx = createEffect({
  handler: (socialNetworkName: string | null) => {
    try {
      const data = JSON.stringify(socialNetworkName)
      localStorage.setItem(SOCIAL_NETWORK_SAVE_KEY, data)
      // eslint-disable-next-line no-empty
    } catch (e) {
    }
  },
})
export const deleteSocialNetworkNameFx = createEffect({
  handler: () => localStorage.removeItem(SOCIAL_NETWORK_SAVE_KEY)
})

$socialNetwork.watch((response)=> console.log(response))