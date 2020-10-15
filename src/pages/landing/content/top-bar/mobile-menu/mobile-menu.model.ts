import { createEvent, restore } from "effector-root"

export const changeMobileMenuVisibility = createEvent<boolean>()
export const $mobileMenuVisibility = restore(changeMobileMenuVisibility, false)
