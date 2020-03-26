import { createEvent, createStore } from "effector"

export const changeMobileFiltersVisibility = createEvent<boolean>()

export const $mobileFiltersVisibility = createStore(false)
  .on(changeMobileFiltersVisibility, (_, payload) => payload)

