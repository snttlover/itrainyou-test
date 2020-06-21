import { root } from "effector-root"

export const TOKEN_KEY = "__token__"

type ServerStartedEventPayload<PARAMS = {}, QUERY = {}> = {
  cookies: {
    [TOKEN_KEY]: string | undefined
  }
  params: PARAMS
  query: QUERY
}

export const serverStarted = root.createEvent<ServerStartedEventPayload>()
