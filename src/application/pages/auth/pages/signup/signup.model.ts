import { registerAsClient, registerAsUser } from "@app/lib/api/register"
import { appDomain } from "@app/store"
import { merge, sample } from "effector"

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
      categories: number[]
    }
  | {
      type: "couch"
      clientData?: ClientData
      categories: number[]
      couchData?: CouchData
    }

export type RegisterUserType = "client" | "couch"

export const signUpDomain = appDomain.createDomain("sign-up-domain")

export const pageMounted = signUpDomain.createEvent()

export const userTypeChanged = signUpDomain.createEvent<RegisterUserType>()
export const userDataChanged = signUpDomain.createEvent<UserData>()
export const clientDataChanged = signUpDomain.createEvent<ClientData>()
export const toggleCategorySelection = signUpDomain.createEvent<number>()
export const couchDataChanged = signUpDomain.createEvent<CouchData>()

export const $userData = signUpDomain
  .createStore<UserData>({ type: "client", categories: [] })
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

export const userRegistered = signUpDomain.createEvent()

const registerUserFx = signUpDomain.createEffect({
  handler(params: UserData) {
    if (params.type === 'client') {
      return registerAsClient({...params.clientData!, categories: params.categories})
    } else {
      return
    }
  }
})

registerUserFx.doneData.watch((data) => {
  localStorage.removeItem(REGISTER_SAVE_KEY)
  const history = require(`@/client`).history
  history.navigate('/')
})

sample({
  source: $userData,
  clock: userRegistered,
  target: registerUserFx
})
