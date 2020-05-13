import { createEvent, createStore } from "effector-next"

export const changeBlueLayoutMobileMenuVisibility = createEvent<boolean>()
export const toggleBlueLayoutMobileMenuVisibility = createEvent()
export const blueLayoutMobileMenuVisibility = createStore(false)
  .on(changeBlueLayoutMobileMenuVisibility, (_, payload) => payload)
  .on(toggleBlueLayoutMobileMenuVisibility, state => !state)

