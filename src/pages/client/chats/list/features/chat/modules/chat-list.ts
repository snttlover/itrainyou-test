import { Chat } from "@/lib/api/chats/clients/get-chats"
import { createPagination } from "@/pages/client/chats/list/features/pagination"
import { PaginationFetchMethod } from "@/pages/client/chats/list/features/pagination/modules/pagination"
import { date } from "@/lib/formatting/date"
import { combine, createEvent, createStore, forward } from "effector-root"
import { getSessionStatusByDates } from "@/pages/client/chats/list/features/chat/modules/get-session-status-by-dates"

export type ChatListModuleConfig = {
  type: "client" | "coach"
  fetchChatsListMethod: PaginationFetchMethod<Chat>
}

export const createChatListModule = (config: ChatListModuleConfig) => {
  const pagination = createPagination<Chat>({
    fetchMethod: config.fetchChatsListMethod,
  })

  const changeTickTime = createEvent<Date>()
  const $tickTime = createStore(new Date()).on(changeTickTime, (_, newDate) => newDate)
  let tick: any = null

  if (process.env.BUILD_TARGET === "client") {
    tick = setInterval(() => changeTickTime(new Date()), 1000)
  }

  const $chatsList = combine(pagination.data.$list, $tickTime, (chats, time) => {
    return chats.map(chat => {
      const interlocutor = config.type === "client" ? chat.coach : chat.clients[0]

      const startTime = chat.lastMessage?.creationDatetime
        ? date(chat.lastMessage?.creationDatetime).format(`HH:mm`)
        : ``

      return {
        avatar: interlocutor.avatar,
        name: `${interlocutor.firstName} ${interlocutor.lastName}`,
        startTime,
        newMessagesCount: 0,
        materialCount: chat.materialsCount,
        isStarted: !!chat.nearestSession,
        lastMessage: chat.lastMessage?.text || ``,
        sessionTextStatus: getSessionStatusByDates(
          chat.nearestSession?.startDatetime,
          chat.nearestSession?.endDatetime
        ),
      }
    })
  })

  const destroy = createEvent()

  destroy.watch(() => {
    clearInterval(tick)
  })

  const loadChats = createEvent()

  forward({
    from: loadChats,
    to: [pagination.useCases.loadMore],
  })

  return {
    modules: {
      pagination,
    },
    data: {
      $chatsList,
    },
    useCases: {
      loadChats,
      destroy
    },
  }
}
