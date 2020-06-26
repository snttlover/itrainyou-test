import { navigatePush } from "@/feature/navigation"
import { loadUserData } from "@/feature/user/user.model"
import { registerAsClient, registerAsCoach } from "@/lib/api/register"
import { routeNames } from "@/pages/route-names"
import { createEffect, createEvent, createStore, forward, merge, sample, split } from "effector-root"

export const REGISTER_SAVE_KEY = "__register-data__"

type ClientData = {
  firstName: string
  lastName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
}

type CoachData = {
  workExperience: string
  education: string
  description: string
  phone: string
  videoInterview: string
}

type UserData =
  | {
      type: "client"
      clientData?: ClientData
      categories: number[]
    }
  | {
      type: "coach"
      clientData?: ClientData
      categories: number[]
      coachData?: CoachData
    }

export type RegisterUserType = "client" | "coach"

export const pageMounted = createEvent()

export const userTypeChanged = createEvent<RegisterUserType>()
export const userDataChanged = createEvent<UserData>()
export const clientDataChanged = createEvent<ClientData>()
export const categoriesChanged = createEvent<number[]>()
export const coachDataChanged = createEvent<CoachData>()
export const userDataReset = createEvent()

export const $userData = createStore<UserData>({ type: "client", categories: [] })
  .on(userTypeChanged, (state, payload) => ({ ...state, type: payload }))
  .on(clientDataChanged, (state, payload) => ({ ...state, clientData: payload }))
  .on(coachDataChanged, (state, payload) => ({ ...state, coachData: payload }))
  .on(categoriesChanged, (state, payload) => ({ ...state, categories: payload }))
  .on(userDataChanged, (_, payload) => payload)
  .reset(userDataReset)

const watchedEvents = merge([userTypeChanged, clientDataChanged, coachDataChanged, categoriesChanged, userDataReset])

const saveDataFx = createEffect({
  handler: (userData: UserData) => {
    try {
      const data = JSON.stringify(userData)
      localStorage.setItem(REGISTER_SAVE_KEY, data)
    } catch (e) {}
  },
})

sample({
  source: $userData,
  clock: watchedEvents,
  target: saveDataFx,
})

const loadDataFx = createEffect({
  handler: () => {
    try {
      const data = localStorage.getItem(REGISTER_SAVE_KEY)
      if (!data) return
      return JSON.parse(data)
    } catch (e) {}
  },
})

forward({ from: loadDataFx.doneData, to: $userData })
forward({ from: pageMounted, to: loadDataFx })

export const userRegistered = createEvent()

export const registerUserFx = createEffect({
  handler(params: UserData) {
    if (params.type === "client") {
      return registerAsClient({ ...params.clientData!, categories: params.categories })
    } else {
      return registerAsCoach({ ...params.clientData!, categories: params.categories, ...params.coachData! })
    }
  },
})

export const skipCoach = createEvent()

forward({ from: registerUserFx.done, to: loadUserData })

registerUserFx.done.watch(_ => {
  localStorage.removeItem(REGISTER_SAVE_KEY)
})

const userType = split(registerUserFx.done, {
  client: ({ params }) => params.type === "client",
  coach: ({ params }) => params.type === "coach",
})

forward({
  from: userType.client.map(() => ({ url: routeNames.client() })),
  to: navigatePush,
})

forward({
  from: userType.coach.map(() => ({ url: routeNames.coach() })),
  to: navigatePush,
})

const registerUser = merge([userRegistered, skipCoach])

sample({
  source: $userData,
  clock: registerUser,
  target: registerUserFx,
})
