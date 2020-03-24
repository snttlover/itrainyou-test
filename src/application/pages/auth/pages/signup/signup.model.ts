import { appDomain } from "@app/store"
import { merge } from "effector"

export const REGISTER_SAVE_KEY = "__register-data__"

type ClientData = {
  firstName: string
  lastName: string
  birthDate: string
  sex: "M" | "F"
  avatar: string
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
      categories?: number[]
    }
  | {
      type: "couch"
      clientData?: ClientData
      categories?: number[]
      couchData?: CouchData
    }

export type RegisterUserType = "client" | "couch"

export const signUpDomain = appDomain.createDomain("sign-up-domain")

export const pageMounted = signUpDomain.createEvent()

export const userTypeChanged = signUpDomain.createEvent<RegisterUserType>()
export const userDataChanged = signUpDomain.createEvent<UserData>()
export const clientDataChanged = signUpDomain.createEvent<ClientData>()
export const categoriesChanged = signUpDomain.createEvent<number[]>()
export const couchDataChanged = signUpDomain.createEvent<CouchData>()

export const $userData = signUpDomain
  .createStore<UserData>({ type: "client" })
  .on(userTypeChanged, (state, payload) => ({ ...state, type: payload }))
  .on(clientDataChanged, (state, payload) => ({ ...state, clientData: payload }))
  .on(couchDataChanged, (state, payload) => ({ ...state, couchData: payload }))
  .on(categoriesChanged, (state, payload) => ({ ...state, categories: payload }))
  .on(userDataChanged, (_, payload) => payload)

const watchedEvents = merge([userTypeChanged, clientDataChanged, couchDataChanged, categoriesChanged])

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
