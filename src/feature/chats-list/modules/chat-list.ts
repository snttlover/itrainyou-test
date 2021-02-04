import { PersonalChat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { createPagination } from "@/feature/pagination"
import { PaginationFetchMethod } from "@/feature/pagination/modules/pagination"
import { date } from "@/lib/formatting/date"
import { routeNames } from "@/pages/route-names"
import { combine, createEffect, createEvent, createStore, forward, guard, sample, split } from "effector-root"
import { getSessionStatusByDates } from "@/feature/chats-list/modules/get-session-status-by-dates"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { condition } from "patronum"
import dayjs from "dayjs"
import { chatSessionIsStarted } from "@/feature/chats-list/modules/chat-session-is-started"
import { logout } from "@/lib/network/token"
import { config as globalConfig } from "@/config"
import { createSessionCallModule } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"

export type ChatListModuleConfig = {
  type: "client" | "coach"
  fetchChatsListMethod: PaginationFetchMethod<PersonalChat>
  socket: ReturnType<typeof createChatsSocket>
  getChat: (id: number) => Promise<PersonalChat>
  sessionCallModule: ReturnType<typeof createSessionCallModule>
}

type ChatListMessage = ChatMessage & { messageInChatList: boolean }

const getChatDate = (chat: PersonalChat) => {
  return dayjs(chat.lastMessage?.creationDatetime || chat.creationDatetime).toDate()
}

export type ChatListTabs = "unread" | "chosen" | "all"

export const createChatListModule = (config: ChatListModuleConfig) => {
  const reset = createEvent()

  const changeSearch = createEvent<string>()
  const $search = createStore<string>("")
    .on(changeSearch, (_, value) => value)
    .reset(reset)

  const changeTab = createEvent<ChatListTabs>()
  const $tab = createStore<ChatListTabs>("all")
    .on(changeTab, (_, tab) => tab)
    .reset(reset)

  const findChats = createEvent()

  const pagination = createPagination<PersonalChat>({
    fetchMethod: config.fetchChatsListMethod,
    $query: combine($tab, $search, (tab, search) => {
      const query: any = {}
      if (tab === "unread") {
        query.unread = "True"
      }

      if (tab === "chosen") {
        query.starred = "True"
      }

      if (search.trim()) {
        query.search = search
      }

      return query
    }),
  })

  const loadChatByMessageFx = createEffect({
    handler: (message: ChatMessage) => config.getChat(message.chat),
  })

  const addMessage = createEvent<ChatListMessage>()
  const loadChatByMessage = createEvent<ChatListMessage>()

  const resetPagination = createEvent()

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
    .on(config.socket.events.onChatCreated, (chats, socketMessage) => [socketMessage.data, ...chats])
    .on(loadChatByMessageFx.doneData, (chats, chat) => [chat, ...chats])

  forward({
    from: resetPagination,
    to: pagination.methods.reset,
  })

  forward({
    from: findChats,
    to: resetPagination,
  })

  forward({
    from: reset,
    to: resetPagination,
  })

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

  forward({
    from: logout,
    to: reset,
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
    config.sessionCallModule.data.$sessionId,
    (chats, time, counters, currentSessionCallId) => {
      return chats
        .filter((chat, index) => chats.findIndex(c => c.id === chat.id) === index)
        // @ts-ignore
        .filter(chat =>  chat.type !== "SUPPORT")
        .sort((chatA, chatB) => (getChatDate(chatA) > getChatDate(chatB) ? -1 : 1))
        .map(chat => {
          const newMessagesCounter = counters.find(counter => counter.id === chat.id)

          const interlocutor = config.type === "client" ? chat.coach : chat.clients[0]
          const userLink = interlocutor
            ? config.type === "client"
              ? routeNames.searchCoachPage(interlocutor.id.toString())
              : routeNames.coachClientProfile(interlocutor.id.toString())
            : ""
          const lastMessageIsMine = !!(config.type === "client"
            ? chat.lastMessage?.senderClient
            : chat.lastMessage?.senderCoach)

          const startTime = chat.lastMessage?.creationDatetime
            ? date(chat.lastMessage?.creationDatetime).format("HH:mm")
            : ""

          return {
            id: chat.id,
            type: chat.type,
            link: `/${config.type}/chats/${chat.id}`,
            avatar: interlocutor?.avatar || null,
            userLink,
            name: `${interlocutor?.firstName} ${interlocutor?.lastName}`,
            startTime,
            newMessagesCount: newMessagesCounter ? newMessagesCounter.newMessagesCount : 0,
            materialCount: chat.materialsCount,
            isStarted: chatSessionIsStarted(chat),
            startSession: config.sessionCallModule.methods.connectToSession,
            isImage: !!chat.lastMessage?.image,
            lastMessage: chat.lastMessage?.text || "",
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

  $chatsList.watch(resp => console.log("test",resp))

  const loadChats = createEvent()

  forward({
    from: loadChats,
    to: [pagination.methods.loadMore],
  })

  forward({
    from: findChats,
    to: loadChats,
  })

  return {
    modules: {
      pagination,
    },
    data: {
      type: config.type,
      $chatsList,
      $search,
      $tab,
    },
    methods: {
      findChats,
      changeSearch,
      changeTab,
      loadChats,
      reset,
    },
  }
}
