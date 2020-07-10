import { Chat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { createPagination } from "@/feature/pagination"
import { PaginationFetchMethod } from "@/feature/pagination/modules/pagination"
import { date } from "@/lib/formatting/date"
import { combine, createEffect, createEvent, createStore, forward, guard, sample, split } from "effector-root"
import { getSessionStatusByDates } from "@/feature/chats-list/modules/get-session-status-by-dates"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { condition } from "patronum"
import dayjs from "dayjs"
import { chatSessionIsStarted } from "@/feature/chats-list/modules/chat-session-is-started"

export type ChatListModuleConfig = {
  type: "client" | "coach"
  fetchChatsListMethod: PaginationFetchMethod<Chat>
  socket: ReturnType<typeof createChatsSocket>
  getChat: (id: number) => Promise<Chat>
}

type ChatListMessage = ChatMessage & { messageInChatList: boolean }

const getChatDate = (chat: Chat) => {
  return dayjs(chat.lastMessage?.creationDatetime || chat.creationDatetime).toDate()
}

export const createChatListModule = (config: ChatListModuleConfig) => {
  const pagination = createPagination<Chat>({
    fetchMethod: config.fetchChatsListMethod,
  })

  const loadChatByMessageFx = createEffect({
    handler: (message: ChatMessage) => config.getChat(message.chat),
  })

  const addMessage = createEvent<ChatListMessage>()
  const loadChatByMessage = createEvent<ChatListMessage>()

  pagination.data.$list
    .on(addMessage, (chats, message) => {
      const chat = chats.find(chat => chat.id === message.chat)

      if (chat) {
        return [
          {
            ...chat,
            lastMessage: message,
          },
          ...chats.filter(chat => chat.id !== message.chat),
        ]
      }

      return chats
    })
    .on(loadChatByMessageFx.doneData, (chats, chat) => [chat, ...chats])

  condition({
    source: sample({
      clock: config.socket.events.onMessage,
      source: pagination.data.$list,
      fn: (chats, message) => ({
        ...message.data,
        messageInChatList: !!chats.find(chat => chat.id === message.data.chat),
      }),
    }),
    if: (message: ChatListMessage) => message.messageInChatList,
    then: addMessage,
    else: loadChatByMessage,
  })

  forward({
    from: loadChatByMessage,
    to: loadChatByMessageFx,
  })

  const changeTickTime = createEvent<Date>()
  const $tickTime = createStore(new Date()).on(changeTickTime, (_, newDate) => newDate)
  let tick: any = null

  if (process.env.BUILD_TARGET === "client") {
    tick = setInterval(() => changeTickTime(new Date()), 1000)
  }

  const $chatsList = combine(
    pagination.data.$list,
    $tickTime,
    config.socket.data.$chatsCounters,
    (chats, time, counters) => {
      return chats
        .sort((chatA, chatB) => getChatDate(chatA) > getChatDate(chatB) ? -1 : 1 )
        .map(chat => {
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
          isStarted: chatSessionIsStarted(chat),
          lastMessage: chat.lastMessage?.text || ``,
          lastMessageIsMine,
          highlightMessages: !!newMessagesCounter,
          sessionTextStatus: getSessionStatusByDates(
            chat.nearestSession?.startDatetime,
            chat.nearestSession?.endDatetime
          ),
        }
      })
    }
  )

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
