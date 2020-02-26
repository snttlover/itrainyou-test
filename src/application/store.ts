import { createDomain } from "effector"

export type ServerSideParams<T = any> = {
  params: T
}

export const appDomain = createDomain()

export const startServer = appDomain.createEvent<ServerSideParams>()
export const startClient = appDomain.createEvent()

export const $isServer = appDomain
  .createStore(true)
  .on(startClient, () => false)
  .reset(startServer)
