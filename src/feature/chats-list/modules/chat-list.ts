import { Chat } from "@/lib/api/chats/clients/get-chats"
import { createPagination } from "@/feature/pagination"
import { PaginationFetchMethod } from "@/feature/pagination/modules/pagination"
import { date } from "@/lib/formatting/date"
import { combine, createEvent, createStore, forward } from "effector-root"
import { getSessionStatusByDates } from "@/feature/chats-list/modules/get-session-status-by-dates"
import { createChatsSocket } from "@/feature/socket/chats-socket"

export type ChatListModuleConfig = {
  type: "client" | "coach"
  fetchChatsListMethod: PaginationFetchMethod<Chat>
  socket: ReturnType<typeof createChatsSocket>
}

export const createChatListModule = (config: ChatListModuleConfig) => {
  const pagination = createPagination<Chat>({
    fetchMethod: config.fetchChatsListMethod,
  })

  pagination.data.$list
    .on(config.socket.events.onMessage, (chats, message) => {
      const chat = chats.find(chat => chat.id === message.data.chat)

      if (chat) {
        return [
          {
            ...chat,
            lastMessage: message.data
          },
          ...chats.filter(chat => chat.id !== message.data.chat)
        ]
      }

      return chats
    })

  const changeTickTime = createEvent<Date>()
  const $tickTime = createStore(new Date()).on(changeTickTime, (_, newDate) => newDate)
  let tick: any = null

  if (process.env.BUILD_TARGET === "client") {
    tick = setInterval(() => changeTickTime(new Date()), 1000)
  }

  const $chatsList = combine(pagination.data.$list, $tickTime, config.socket.data.$chatsCounters, (chats, time, counters) => {
    return chats.map(chat => {

      const newMessagesCounter = counters.find(counter => counter.id === chat.id)

      const interlocutor = config.type === "client" ? chat.coach : chat.clients[0]
      const lastMessageIsMine = !!(config.type === "client"
        ? chat.lastMessage?.senderClient
        : chat.lastMessage?.senderCoach)

      const startTime = chat.lastMessage?.creationDatetime
        ? date(chat.lastMessage?.creationDatetime).format(`HH:mm`)
        : ``

      return {
        link: `/${config.type}/chats/${chat.id}`,
        avatar: interlocutor?.avatar || null,
        name: `${interlocutor?.firstName} ${interlocutor?.lastName}`,
        startTime,
        newMessagesCount: newMessagesCounter ? newMessagesCounter.newMessagesCount : 0,
        materialCount: chat.materialsCount,
        isStarted: !!chat.nearestSession,
        lastMessage: chat.lastMessage?.text || ``,
        lastMessageIsMine,
        sessionTextStatus: getSessionStatusByDates(
          chat.nearestSession?.startDatetime,
          chat.nearestSession?.endDatetime
        ),
      }
    })
  })

  const loadChats = createEvent()

  forward({
    from: loadChats,
    to: [pagination.methods.loadMore],
  })

  return {
    modules: {
      pagination,
    },
    data: {
      $chatsList,
    },
    methods: {
      loadChats,
    },
  }
}
