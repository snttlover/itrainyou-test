import { navigatePush } from "@/feature/navigation"
import { registerAsClient, registerAsCoach } from "@/lib/api/register"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { routeNames } from "@/pages/route-names"
import { attach, createEffect, createEvent, createStore, forward, merge, sample, split } from "effector-root"

export const REGISTER_SAVE_KEY = "__register-data__"

export type ClientData = {
  firstName: string
  lastName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  email: string | null
}

export type CoachData = {
  workExperience: string
  education: string
  description: string
  phone: string
  photos: string[]
  videoInterview: string
}

export type UserData = {
  type: "coach" | "client"
  clientData: ClientData
  categories: number[]
  coachData: CoachData
}

export type SocialsDataNotFound = {
    email: string | null
    first_name: string
    last_name: string
    sex: "M" | "F" | ""
    birth_date: string | null
    avatar: string | null
}

export type SocialsDataFound = {
    id: number
    email: string
    time_zone: string
    creation_datetime: string
    coach: string | null
    client: string | null
}

export type RegisterUserType = "client" | "coach"

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
  clientData: { avatar: null, birthDate: null, lastName: "", sex: "", firstName: "",email: null },
  coachData: { description: "", education: "", phone: "", videoInterview: "", workExperience: "", photos: [] },
  categories: [],
})
  .on(userTypeChanged, (state, payload) => ({ ...state, type: payload }))
  .on(clientDataChanged, (state, payload) => ({ ...state, clientData: payload }))
  .on(coachDataChanged, (state, payload) => ({ ...state, coachData: payload }))
  .on(categoriesChanged, (state, payload) => ({ ...state, categories: payload }))
  .on(userDataChanged, (_, payload) => payload)
  .on(userDataSetWithSocials, (_, payload) => payload)
  .reset(userDataReset)

const saveDataFx = createEffect({
  handler: (userData: UserData) => {
    try {
      const data = JSON.stringify(userData)
      localStorage.setItem(REGISTER_SAVE_KEY, data)
    } catch (e) {}
  },
})

forward({
  from: $userData.updates,
  to: saveDataFx,
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
forward({ from: signUpPageMounted, to: loadDataFx })

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

const getMyUserDataFx = attach({
  effect: getMyUserFx as any,
  mapParams: () => ({}),
})

forward({ from: registerUserFx.done, to: getMyUserDataFx })

registerUserFx.done.watch(_ => {
  localStorage.removeItem(REGISTER_SAVE_KEY)
})

const event = sample({ clock: getMyUserDataFx.done, source: registerUserFx.done.map(({ params }) => params) })

const userType = split(event, {
  client: ({ type }) => type === "client",
  coach: ({ type }) => type === "coach",
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
