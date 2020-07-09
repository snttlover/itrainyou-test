import { createSocket } from "@/feature/socket/create-socket"
import { ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { config } from "@/config"
import { combine, createEvent, createStore, forward, guard, sample } from "effector-root"
import { $token, logout } from "@/lib/network/token"
import { $isLoggedIn } from "@/feature/user/user.model"
import { $isClient } from "@/lib/effector"

type SendSocketChatMessage = {
  chat: number
  text: string
}

type ReadChatMessages = {
  messages: number[]
}

type ChatCounter = {
  id: number
  newMessagesCount: number
}

type InitMessage = {
  type: `INIT`
  data: { unreadChats: ChatCounter[] }
}

export type WriteChatMessageDone = {
  type: `WRITE_MESSAGE_DONE`
  data: ChatMessage
}

type SocketMessageReceive = WriteChatMessageDone | InitMessage

type UserType = "client" | "coach"

const getChatSocketLink = (type: UserType, token: string) => {
  return `${config.WS_HOST}/ws/chat/${type}/?token=${token}`
}

export const createChatsSocket = (userType: UserType) => {
  const socket = createSocket()

  const onMessage = createEvent<WriteChatMessageDone>()

  const send = socket.methods.send.prepend<SendSocketChatMessage>(data => ({ type: `WRITE_MESSAGE`, data }))
  const readMessages = socket.methods.send.prepend<ReadChatMessages>(data => ({ type: `READ_MESSAGES`, data }))

  const $needConnect = combine($isLoggedIn, $isClient, (l, c) => l && c)
  const connect = guard({
    source: $token,
    filter: $needConnect,
    target: socket.methods.connect,
  })

  const changeCountersFromInit = createEvent<InitMessage>()
  const $chatsCounters = createStore<ChatCounter[]>([]).on(
    changeCountersFromInit,
    (_, message) => message.data.unreadChats
  )
  const $chatsCount = $chatsCounters.map($counters => $counters.length)

  guard({
    source: socket.events.onMessage,
    filter: (payload: SocketMessageReceive) => payload.type === `WRITE_MESSAGE_DONE`,
    target: onMessage,
  })

  guard({
    source: socket.events.onMessage,
    filter: (payload: SocketMessageReceive) => payload.type === `INIT`,
    target: changeCountersFromInit,
  })

  sample({
    source: $token,
    clock: $needConnect,
    fn: token => getChatSocketLink(userType, token),
    target: connect,
  })

  forward({
    from: logout,
    to: socket.methods.disconnect,
  })

  return {
    data: {
      $chatsCount,
      $chatsCounters
    },
    events: {
      ...socket.events,
      onMessage,
    },
    methods: {
      send,
      readMessages
    },
  }
}

export const clientChatsSocket = createChatsSocket(`client`)
export const coachChatsSocket = createChatsSocket(`coach`)
