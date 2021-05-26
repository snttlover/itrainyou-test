import { attach, createEffect, createEvent, createStore, guard, merge, sample, split } from "effector-root"
import {
  ClientData,
  CoachData,
  REGISTER_SAVE_KEY,
  RegisterUserType,
  UserData
} from "@/pages/auth/pages/signup/models/types"
import { registerAsClient, registerAsCoach } from "@/lib/api/register"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { createGate } from "@/scope"
import { getPriceRanges, PriceRangesType } from "@/lib/api/get-price-ranges"

export const signUpPageMounted = createEvent()
export const userTypeChanged = createEvent<RegisterUserType>()
export const userDataChanged = createEvent<UserData>()
export const clientDataChanged = createEvent<ClientData>()
export const categoriesChanged = createEvent<number[]>()
export const coachDataChanged = createEvent<CoachData>()
export const userDataReset = createEvent()
export const userDataSetWithSocials = createEvent<UserData>()
export const selectPriceRange = createEvent<{id: number}>()

export const priceRangesGate = createGate()

export const $userData = createStore<UserData>({
  type: "client",
  clientData: { avatar: null, originalAvatar: null, birthDate: null, lastName: "", sex: "", firstName: "", email: null, middleName: "", priceRanges: []},
  coachData: { description: "", education: "", phone: "", videoInterview: "", workExperience: "", photos: [],
    inn: "",
    legalForm: "",
    socialNetworks: "",
    supervisions: "" },
  categories: []
})

export const $priceRanges = createStore<PriceRangesType[]>([])
export const $rangeSelected = createStore(false)

export const getPriceRangesFx = createEffect({
  handler: getPriceRanges,
})

export const saveDataFx = createEffect({
  handler: (userData: UserData) => {
    const data = JSON.stringify(userData)
    localStorage.setItem(REGISTER_SAVE_KEY, data)
  }
})

export const loadDataFx = createEffect({
  handler: () => {
    const data = localStorage.getItem(REGISTER_SAVE_KEY)
    if (!data) return
    return JSON.parse(data)
  }
})

export const userRegistered = createEvent()

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

export const getMyUserDataFx = attach({
  effect: getMyUserFx as any,
  mapParams: () => ({})
})

const event = sample({ clock: getMyUserDataFx.done, source: registerUserFx.done.map(({ params }) => params) })

export const userType = split(event, {
  client: ({ type }) => type === "client",
  coach: ({ type }) => type === "coach"
})

export const registerStep4Merged = merge([userRegistered, skipCoach])