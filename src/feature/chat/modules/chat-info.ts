import { Chat } from "@/lib/api/chats/clients/get-chats"
import { createEffect, createEvent, createStore, forward, sample } from "effector-root"

type createChatInfoModuleTypes = {
  type: 'coach' | 'client'
  fetchChat: (id: number) => Promise<Chat>
}

export const createChatInfoModule = (config: createChatInfoModuleTypes) => {
  const reset = createEvent()

  const changeId = createEvent<number>()
  const $chatId = createStore(0).on(changeId, (_, id) => id)

  const loadChatFx = createEffect({
    handler: (id: number) => config.fetchChat(id),
  })

  const loadChat = createEvent<number>()
  const $chatInfo = createStore<null | Chat>(null).on(loadChatFx.doneData, (_, chat) => chat).reset(reset)

  const $chat = $chatInfo.map(chat => {
    const interc = config.type === `client` ? chat?.coach : chat?.clients[0]

    return {
      avatar: interc?.avatar,
      userName: `${interc?.firstName} ${interc?.lastName}`
    }
  })

  sample({
    source: $chatId,
    clock: loadChat,
    target: loadChatFx,
  })

  return {
    $loading: loadChatFx.pending,
    $chat,
    $chatId,
    loadChat,
    changeId,
    reset
  }
}
