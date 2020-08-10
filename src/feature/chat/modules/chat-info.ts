import { Chat } from "@/lib/api/chats/clients/get-chats"
import { combine, createEffect, createEvent, createStore, sample } from "effector-root"
import { routeNames } from "@/pages/route-names"
import { createNotFoundModule } from "@/feature/not-found/not-found"
import { $bannedUsers, $restrictedUsers, $userData } from "@/feature/user/user.model"

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

  const $interc = $chatInfo.map(chat => (chat?.clients ? chat.clients[0] : null))
  const $chatType = createStore(config.type)
  const $isBlocked = combine(
    $chatType,
    $bannedUsers,
    $interc,
    (type, banned, interc) => !!interc && type === `coach` && !!banned.includes(interc.id)
  )
  const $isRestricted = combine(
    $chatType,
    $restrictedUsers,
    $interc,
    (type, restricted, interc) => !!interc && type === `coach` && !!restricted.includes(interc.id)
  )

  const $chat = combine($chatInfo, $isBlocked, $isRestricted, (chat, blocked, restricted) => {
    const interc = config.type === `client` ? chat?.coach : chat?.clients[0]
    return {
      id: chat?.id,
      avatar: interc?.avatar,
      name: `${interc?.firstName} ${interc?.lastName}`,
      userId: interc?.id || 0,
      userSex: interc?.sex || `M`,
      link: config.type === `client` && { url: routeNames.searchCoachPage((interc?.id || 0).toString()) },
      backLink: config.type === `client` ? routeNames.clientChatsList() : routeNames.coachClients(),
      type: config.type,
      chatType: chat?.type,
      blocked,
      restricted,
    }
  })

  const $blockedText = $chat.map(chat => {
    if (chat.type === `coach`) {
      if (chat.blocked) {
        return `Вы заблокировали клиента`
      }

      if (chat.restricted) {
        return `Вы заблокировали клиента до покупки сессии`
      }
    }

    if (chat.type === `client`) {
      if (chat.blocked || chat.restricted) {
        return `${chat.name} заблокировал${chat.userSex === `F` ? `a` : ``} вас`
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
    $loading: loadChatFx.pending,
    $chat,
    $chatId,
    $notFound: notFound.$isNotFound,
    loadChat,
    changeId,
    reset,
    data: {
      $isBlocked,
      $isRestricted,
      $blockedText,
    },
  }
}
