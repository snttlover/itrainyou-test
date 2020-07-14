import { createEffect, createEvent, forward, guard, sample } from "effector-root"
import { getChatWithCoach } from "@/lib/api/chats/clients/get-chat-with-coach"
import { createChatWithCoach } from "@/lib/api/chats/clients/create-chat-with-coach"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"

const checkCoachChatFx = createEffect({
  handler: (id: number) => getChatWithCoach(id)
    .catch(e => Promise.reject(id))
})

const createChatFx = createEffect({
  handler: createChatWithCoach
})

export const writeToCoach = createEvent<number | null>()

guard({
  source: writeToCoach,
  filter: (id) => id !== null,
  target: checkCoachChatFx
})

forward({
  // @ts-ignore
  from: checkCoachChatFx.failData,
  to: createChatFx
})

forward({
  from: checkCoachChatFx.doneData.map((chat) => ({ url: routeNames.clientChat(chat.id) })),
  to: navigatePush
})

forward({
  from: createChatFx.doneData.map((chat) => ({ url: routeNames.clientChat(chat.id) })),
  to: navigatePush
})
