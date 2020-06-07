import { User } from "@/application/lib/api/client"
import { registerAsClient, registerAsCoach } from "@/application/lib/api/register"
import { attach, createEffect, createEvent, createStore, merge, sample } from "effector-next"
import Router from "next/router"

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

$userData.watch(watchedEvents, userData => {
  try {
    const data = JSON.stringify(userData)
    localStorage.setItem(REGISTER_SAVE_KEY, data)
  } catch (e) {}
})

pageMounted.watch(() => {
  try {
    const data = localStorage.getItem(REGISTER_SAVE_KEY)
    if (!data) return
    const userData = JSON.parse(data)
    userDataChanged(userData)
  } catch (e) {}
})

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

export const skipCoachFx = attach({
  source: $userData,
  mapParams: (params: UserData, data) => ({ ...data }),
  effect: createEffect({
    handler(params: UserData) {
      return registerAsCoach({
        ...params.clientData!,
        categories: [],
        workExperience: "",
        education: "",
        description: "",
        phone: "",
        videoInterview: "",
      })
    },
  }),
})

merge([registerUserFx.done, skipCoachFx.done]).watch(response => {
  localStorage.removeItem(REGISTER_SAVE_KEY)
  if (response.params.type === "client") {
    Router.push("/client", "/client")
  } else {
    Router.push("/coach", "/coach")
  }
})

sample({
  source: $userData,
  clock: userRegistered,
  target: registerUserFx,
})
