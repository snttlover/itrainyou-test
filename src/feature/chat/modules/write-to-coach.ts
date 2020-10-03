import { createEffect, createEvent, forward, guard, sample } from "effector-root"
import { getChatWithCoach } from "@/lib/api/chats/clients/get-chat-with-coach"
import { createChatWithCoach } from "@/lib/api/chats/clients/create-chat-with-coach"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { getChatWithClient } from "@/lib/api/chats/coach/get-chat-with-client"
import { createChatWithClient } from "@/lib/api/chats/coach/create-chat-with-client"


type CreateWriteToUserModule = {
  navigateTo: (id: string) => string
  checkChat: (id: number) => Promise<PersonalChat>
  createChat: (id: number) => Promise<PersonalChat>
}

const createWriteToUserModule = (config: CreateWriteToUserModule) => {
  const write = createEvent<number | null>()

  const checkChatFx = createEffect({
    handler: (id: number) => config.checkChat(id)
      .catch(e => Promise.reject(id))
  })

  const createChatFx = createEffect({
    handler: config.createChat
  })

  guard({
    source: write,
    filter: (id) => id !== null,
    target: checkChatFx
  })

  forward({
    // @ts-ignore
    from: checkChatFx.failData,
    to: createChatFx
  })

  forward({
    from: checkChatFx.doneData.map((chat) => ({ url: config.navigateTo(chat.id.toString()) })),
    to: navigatePush
  })

  forward({
    from: createChatFx.doneData.map((chat) => ({ url: config.navigateTo(chat.id.toString()) })),
    to: navigatePush
  })

  return write
}

export const writeToCoach = createWriteToUserModule({
  navigateTo: routeNames.clientChat,
  checkChat: getChatWithCoach,
  createChat: createChatWithCoach
})

export const writeToClient = createWriteToUserModule({
  navigateTo: routeNames.coachChat,
  checkChat: getChatWithClient,
  createChat: createChatWithClient
})
