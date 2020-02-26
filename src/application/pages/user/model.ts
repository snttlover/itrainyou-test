import { forward } from "effector"
import { appDomain } from "../../store"
import axios from "axios"

const userPageDomain = appDomain.createDomain("user-page")

export const fetchUserFx = userPageDomain
  .createEffect<string, string>()
  .use((id: string) =>
    axios(`http://www.mocky.io/v2/${id}`).then(res => res.data.name)
  )

export const $userName = userPageDomain
  .createStore("unknown")
  .on(fetchUserFx.done, (_, payload) => payload.result)


export const loadUser = userPageDomain.createEvent<string>()

forward({
  from: loadUser,
  to: fetchUserFx
})
