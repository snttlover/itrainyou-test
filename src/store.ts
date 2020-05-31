import { createEvent, PageContext } from "effector-next"

export const TOKEN_KEY = "__token__"

export const serverStarted = createEvent<PageContext<{ [TOKEN_KEY]: string }>>()
