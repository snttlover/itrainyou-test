import { createSocket } from "@/feature/socket/create-socket"
import { ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { config } from "@/config"
import { combine, createEvent, forward, guard, sample } from "effector-root"
import { $token, logout } from "@/lib/network/token"
import { $isLoggedIn } from "@/feature/user/user.model"
import { $isClient } from "@/lib/effector"

type SendSocketChatMessage = {
  chat: number
  text: string
}

export type SocketChatMessage = {
  type: `MESSAGE`,
  message: ChatMessage
}

type UserType = "client" | "coach"

const getChatSocketLink = (type: UserType, token: string) => {
  return `${config.WS_HOST}/ws/chat/${type}/?token=${token}`
}

export const createChatsSocket = (userType: UserType) => {
  const socket = createSocket()

  const onMessage = createEvent<SocketChatMessage>()

  const send = socket.methods.send.prepend<SendSocketChatMessage>((message) =>({type: `MESSAGE`, message}))

  const $needConnect = combine($isLoggedIn, $isClient, (l, c) => l && c)
  const connect = guard({
    source: $token,
    filter: $needConnect,
    target: socket.methods.connect
  })

  guard({
    source: socket.events.onMessage,
    filter: (payload: SocketChatMessage) => payload.type === `MESSAGE`,
    target: onMessage
  })

  sample({
    source: $token,
    clock: $needConnect,
    fn: token => getChatSocketLink(userType, token),
    target: connect,
  })

  forward({
    from: logout,
    to: socket.methods.disconnect
  })

  return {
    events: {
      ...socket.events,
      onMessage,
    },
    methods: {
      send
    }
  }
}

export const clientChatsSocket = createChatsSocket(`client`)
export const coachChatsSocket = createChatsSocket(`coach`)
