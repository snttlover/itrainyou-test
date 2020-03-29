import { registerAsClient, registerAsCouch } from "@/application/lib/api/register"
import { createEffect, createEvent, createStore, merge, sample } from "effector-next"
import Router from "next/router"

export const REGISTER_SAVE_KEY = "__register-data__"

type ClientData = {
  firstName: string
  lastName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
}

type CouchData = {
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
      type: "couch"
      clientData?: ClientData
      categories: number[]
      couchData?: CouchData
    }

export type RegisterUserType = "client" | "couch"

export const pageMounted = createEvent()

export const userTypeChanged = createEvent<RegisterUserType>()
export const userDataChanged = createEvent<UserData>()
export const clientDataChanged = createEvent<ClientData>()
export const toggleCategorySelection = createEvent<number>()
export const couchDataChanged = createEvent<CouchData>()

export const $userData = createStore<UserData>({ type: "client", categories: [] })
  .on(userTypeChanged, (state, payload) => ({ ...state, type: payload }))
  .on(clientDataChanged, (state, payload) => ({ ...state, clientData: payload }))
  .on(couchDataChanged, (state, payload) => ({ ...state, couchData: payload }))
  .on(toggleCategorySelection, (state, id) => {
    const isAlreadyExists = state.categories.includes(id)
    if (isAlreadyExists) state.categories = state.categories.filter(catId => catId !== id)
    else state.categories.push(id)
    return { ...state, categories: [...state.categories] }
  })
  .on(userDataChanged, (_, payload) => payload)

const watchedEvents = merge([userTypeChanged, clientDataChanged, couchDataChanged, toggleCategorySelection])

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
      return registerAsCouch({ ...params.clientData!, categories: params.categories, ...params.couchData! })
    }
  }
})

registerUserFx.doneData.watch(data => {
  localStorage.removeItem(REGISTER_SAVE_KEY)
  Router.push("/", "/")
})

sample({
  source: $userData,
  clock: userRegistered,
  target: registerUserFx
})
