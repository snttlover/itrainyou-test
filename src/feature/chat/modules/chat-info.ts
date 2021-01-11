import { Chat } from "@/lib/api/chats/clients/get-chats"
import { createEffect, createEvent, createStore, sample } from "effector-root"
import { routeNames } from "@/pages/route-names"
import { createNotFoundModule } from "@/feature/not-found/not-found"

type createChatInfoModuleTypes = {
  type: "coach" | "client"
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
  const $chatInfo = createStore<null | Chat>(null)
    .on(loadChatFx.doneData, (_, chat) => chat)
    .reset(reset)

  const notFound = createNotFoundModule({
    effect: loadChatFx,
    reset,
  })

  const $chat = $chatInfo.map(chat => {
    const interc = config.type === "client" ? chat?.coach : chat?.clients[0]
    return {
      id: chat?.id,
      avatar: interc?.avatar,
      name: `${interc?.firstName} ${interc?.lastName}`,
      userId: interc?.id || 0,
      userSex: interc?.sex || "M",
      link:
        config.type === "client"
          ? routeNames.searchCoachPage((interc?.id || 0).toString())
          : routeNames.coachClientProfile((interc?.id || 0).toString()),
      backLink: config.type === "client" ? routeNames.clientChatsList() : routeNames.coachClients(),
      type: config.type,
      chatType: chat?.type,
      blocked: !!chat?.isBanned,
      restricted: !!chat?.isRestricted,
    }
  })

  const $blockedText = $chat.map(chat => {
    if (chat.type === "coach") {
      if (chat.blocked) {
        return "Вы заблокировали клиента"
      }

      if (chat.restricted) {
        return "Вы заблокировали клиента до покупки сессии"
      }
    }

    if (chat.type === "client") {
      if (chat.blocked) {
        return "Коуч заблокировал вас"
      }
      if (chat.restricted) {
        return "Коуч заблокировал вас до покупки сессии"
      }
    }
    return null
  })

  sample({
    source: $chatId,
    clock: loadChat,
    target: loadChatFx,
  })

  return {
    $chatInfo,
    $loading: loadChatFx.pending,
    $chat,
    $chatId,
    $notFound: notFound.$isNotFound,
    loadChat,
    changeId,
    reset,
    data: {
      $isBlocked: $chat.map(chat => chat.blocked),
      $isRestricted: $chat.map(chat => chat.restricted),
      $blockedText,
    },
  }
}
