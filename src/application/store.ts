import { createDomain } from "effector"

export const appDomain = createDomain()

export const startServer = appDomain.createEvent()
export const startClient = appDomain.createEvent()

export const $isServer = appDomain
  .createStore(true)
  .on(startClient, () => false)
  .reset(startServer)
