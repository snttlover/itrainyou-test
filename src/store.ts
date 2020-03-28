import { createEvent, ServerPayload } from "effector-next"

export const serverStarted = createEvent<ServerPayload>()
