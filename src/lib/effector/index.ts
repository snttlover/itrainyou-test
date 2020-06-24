import { createEvent, Event, restore } from "effector-root"

export const START = `☄️/start-event`
export type ServerParams = {
  query: Record<string, string>
  params: Record<string, string>
}

export function getStart<T>(component: T): undefined | Event<ServerParams> {
  return component && component[START]
}

export const clientStarted = createEvent()
export const $isClient = restore(
  clientStarted.map(() => true),
  false
)
