import { Chat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { createPagination } from "@/pages/client/chats/list/features/pagination"
import { PaginationFetchMethod } from "@/pages/client/chats/list/features/pagination/modules/pagination"
import { date } from "@/lib/formatting/date"
import { combine, createEvent, createStore, forward, guard, sample } from "effector-root"
import { getSessionStatusByDates } from "@/pages/client/chats/list/features/chat/modules/get-session-status-by-dates"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { clientChatsSocket } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { logout } from "@/lib/network/token"

export type ChatListModuleConfig = {
  type: "client" | "coach"
  fetchChatsListMethod: PaginationFetchMethod<Chat>
  socket: ReturnType<typeof createChatsSocket>
}

export const createChatListModule = (config: ChatListModuleConfig) => {
  const pagination = createPagination<Chat>({
    fetchMethod: config.fetchChatsListMethod,
  })

  const onMessage = createEvent<ChatMessage>()

  pagination.data.$list
    .on(onMessage, (chats, message) => {
      const chatIndex = chats.findIndex(chat => chat.id === message.chat)
      if (chatIndex) {
        return chats.splice(chatIndex, 1, {
          ...chats[chatIndex],
          lastMessage: message,
        })
      }
      return chats
    })
    .on(logout, () => [])

  guard({
    source: config.socket.events.onMessage,
    filter: (message: any) => !message.status,
    target: onMessage
  })

  pagination.data.$currentPage.on(logout, () => 0)

  const changeTickTime = createEvent<Date>()
  const $tickTime = createStore(new Date()).on(changeTickTime, (_, newDate) => newDate)
  let tick: any = null

  if (process.env.BUILD_TARGET === "client") {
    tick = setInterval(() => changeTickTime(new Date()), 1000)
  }

  const $chatsList = combine(pagination.data.$list, $tickTime, (chats, time) => {
    return chats.map(chat => {
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
        newMessagesCount: 0,
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
