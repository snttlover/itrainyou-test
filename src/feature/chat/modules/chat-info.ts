import { PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { createEffect, createEvent, createStore, forward, sample } from "effector-root"
import { routeNames } from "@/pages/route-names"
import { AxiosError } from "axios"
import { logout } from "@/lib/network/token"
import { createNotFoundModule } from "@/feature/not-found/not-found"

type createChatInfoModuleTypes = {
  type: "coach" | "client"
  fetchChat: (id: number) => Promise<PersonalChat>
}

export const createChatInfoModule = (config: createChatInfoModuleTypes) => {
  const reset = createEvent()

  const changeId = createEvent<number>()
  const $chatId = createStore(0).on(changeId, (_, id) => id)

  const loadChatFx = createEffect({
    handler: (id: number) => config.fetchChat(id),
  })

  const loadChat = createEvent<number>()
  const $chatInfo = createStore<null | PersonalChat>(null)
    .on(loadChatFx.doneData, (_, chat) => chat)
    .reset(reset)

  const notFound =  createNotFoundModule({
    effect: loadChatFx,
    reset
  })

  const $chat = $chatInfo.map(chat => {
    const interc = config.type === `client` ? chat?.coach : chat?.clients[0]

    return {
      id: chat?.id,
      avatar: interc?.avatar,
      name: `${interc?.firstName} ${interc?.lastName}`,
      link: config.type === `client` && { url: routeNames.searchCoachPage(interc?.id as string) },
      backLink: config.type === `client` ? routeNames.clientChatsList() : routeNames.coachClients(),
      type: config.type,
      chatType: chat?.type
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
    $notFound: notFound.$isNotFound,
    loadChat,
    changeId,
    reset,
  }
}
