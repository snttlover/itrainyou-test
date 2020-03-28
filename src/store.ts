import { createEvent, ServerPayload } from "effector-next"

export const TOKEN_KEY = '__token__'
type Cookies = {
  [TOKEN_KEY]: string | undefined
}

export const serverStarted = createEvent<ServerPayload<Cookies>>()
