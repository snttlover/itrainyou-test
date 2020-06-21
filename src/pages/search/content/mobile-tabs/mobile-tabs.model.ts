import { createEvent, createStore } from "effector-root"

export const changeMobileFiltersVisibility = createEvent<boolean>()

export const $mobileFiltersVisibility = createStore(false).on(changeMobileFiltersVisibility, (_, payload) => payload)
