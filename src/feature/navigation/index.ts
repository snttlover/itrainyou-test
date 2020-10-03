import { createQueryString } from "#/lib/helpers/query"
import { createEvent, createStore } from "effector-root"
import { createBrowserHistory } from "history"

type QueryParams = {
  [key: string]: any
}

type Navigate = {
  url: string
  query?: QueryParams
}

export const history = process.env.BUILD_TARGET === "client" ? createBrowserHistory() : null

export const navigatePush = createEvent<Navigate>()
export const navigateReplace = createEvent<Navigate>()

export const $lastUrlServerNavigation = createStore("")

if (process.env.BUILD_TARGET === "client") {
  navigatePush.watch(navigate => history!.push(`${navigate.url}${createQueryString(navigate.query)}`))
  navigateReplace.watch(navigate => history!.replace(`${navigate.url}${createQueryString(navigate.query)}`))
} else {
  $lastUrlServerNavigation.on(
    [navigatePush, navigateReplace],
    (_, navigate) => `${navigate.url}${createQueryString(navigate.query)}`
  )
}
