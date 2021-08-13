import { attach, createEffect, createEvent, createStore, merge, sample, split } from "effector-root"
import {
  ClientData,
  COACH_TO_REDIRECT_AFTER_SIGN_UP,
  CoachData,
  coachToRedirectAfterSignUpType,
  REGISTER_SAVE_KEY,
  RegisterUserType,
  UserData
} from "@/pages/auth/pages/signup/models/types"
import { registerAsClient, registerAsCoach } from "@/lib/api/register"
import { createGate } from "@/scope"
import { getPriceRanges, PriceRangesType } from "@/lib/api/get-price-ranges"
import { persist } from "effector-storage/local"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"

export const signUpPageMounted = createEvent()
export const userTypeChanged = createEvent<RegisterUserType>()
export const userDataChanged = createEvent<UserData>()
export const clientDataChanged = createEvent<ClientData>()
export const categoriesChanged = createEvent<number[]>()
export const coachDataChanged = createEvent<CoachData>()
export const userDataReset = createEvent()
export const userDataSetWithSocials = createEvent<UserData>()
export const selectPriceRange = createEvent<{id: number}>()

export const $coachToRedirectAfterSignUp = createStore<coachToRedirectAfterSignUpType | null>(null)
// Без сохранения не будет работать редирект при регистрации через социальные сети (т.к. стор сбросится после редиректа)
persist({
  store: $coachToRedirectAfterSignUp,
  key: COACH_TO_REDIRECT_AFTER_SIGN_UP
})

export const setRedirectToCoachAfterSignUp = createEvent<coachToRedirectAfterSignUpType | null>()

export const priceRangesGate = createGate()

export const $registerUserData = createStore<UserData>({
  type: "client",
  clientData: {
    avatar: null,
    originalAvatar: null,
    birthDate: null,
    lastName: "",
    sex: "",
    firstName: "",
    email: null,
    middleName: "",
    priceRanges: []
  },
  coachData: {
    description: "",
    education: "",
    videoInterview: "",
    workExperience: "",
    photos: [],
    inn: "",
    legalForm: "",
    socialNetworks: "",
    supervisions: ""
  },
  categories: []
})
persist({
  store: $registerUserData,
  key: REGISTER_SAVE_KEY
})

export const $priceRanges = createStore<PriceRangesType[]>([])
export const $rangeSelected = createStore(false)

export const getPriceRangesFx = createEffect({
  handler: getPriceRanges,
})

export const registerUser = createEvent()

export const registerUserFx = createEffect({
  handler(params: UserData) {
    if (params.type === "client") {
      return registerAsClient({ ...params.clientData!, categories: params.categories })
    } else {
      return registerAsCoach({ ...params.clientData!, categories: params.categories, ...params.coachData! })
    }
  }
})

export const skipCoach = createEvent()

export const getMyUserDataFx = getMyUserApiFx.clone()

const event = sample({
  clock: getMyUserDataFx.done,
  source: registerUserFx.done.map(({ params }) => params)
})

export const userType = split(event, {
  client: ({ type }) => type === "client",
  coach: ({ type }) => type === "coach"
})

export const registerStep4Merged = merge([registerUser, skipCoach])
