import { attach, createEffect, createEvent, createStore, merge, sample, split } from "effector-root"
import {
  ClientData,
  CoachData,
  REGISTER_SAVE_KEY,
  RegisterUserType,
  UserData
} from "@/pages/auth/pages/signup/models/types"
import { registerAsClient, registerAsCoach } from "@/lib/api/register"
import { getMyUserFx } from "@/lib/api/users/get-my-user"

export const signUpPageMounted = createEvent()
export const userTypeChanged = createEvent<RegisterUserType>()
export const userDataChanged = createEvent<UserData>()
export const clientDataChanged = createEvent<ClientData>()
export const categoriesChanged = createEvent<number[]>()
export const coachDataChanged = createEvent<CoachData>()
export const userDataReset = createEvent()
export const userDataSetWithSocials = createEvent<UserData>()
export const $userData = createStore<UserData>({
  type: "client",
  clientData: { avatar: null, birthDate: null, lastName: "", sex: "", firstName: "", email: null },
  coachData: { description: "", education: "", phone: "", videoInterview: "", workExperience: "", photos: [] },
  categories: []
})
  .on(userTypeChanged, (state, payload) => ({ ...state, type: payload }))
  .on(clientDataChanged, (state, payload) => ({ ...state, clientData: payload }))
  .on(coachDataChanged, (state, payload) => ({ ...state, coachData: payload }))
  .on(categoriesChanged, (state, payload) => ({ ...state, categories: payload }))
  .on(userDataChanged, (_, payload) => payload)
  .on(userDataSetWithSocials, (_, payload) => payload)
  .reset(userDataReset)
export const saveDataFx = createEffect({
  handler: (userData: UserData) => {
    try {
      const data = JSON.stringify(userData)
      localStorage.setItem(REGISTER_SAVE_KEY, data)
    } catch (e) {
    }
  }
})
export const loadDataFx = createEffect({
  handler: () => {
    try {
      const data = localStorage.getItem(REGISTER_SAVE_KEY)
      if (!data) return
      return JSON.parse(data)
    } catch (e) {
    }
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