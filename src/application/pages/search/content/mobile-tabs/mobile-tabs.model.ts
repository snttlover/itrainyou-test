import { appDomain } from "@/application/store"

const tabsDomain = appDomain.createDomain()

export const changeMobileFiltersVisibility = tabsDomain.createEvent<boolean>()

export const $mobileFiltersVisibility = tabsDomain
  .createStore(false)
  .on(changeMobileFiltersVisibility, (_, payload) => payload)

