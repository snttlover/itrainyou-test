import { createSocket } from "@/feature/socket/create-socket"
import { ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { config } from "@/config"
import { combine, createEvent, forward, guard, sample } from "effector-root"
import { $token, logout } from "@/lib/network/token"
import { $isLoggedIn } from "@/feature/user/user.model"
import { $isClient } from "@/lib/effector"

type SocketChatMessage = {
  chat: number
  text: string
}

type UserType = "client" | "coach"

const WS_HOST = `ws${(config.BACKEND_URL || ``).replace(/^https/, ``)}`

const getChatSocketLink = (type: UserType, token: string) => {
  return `ws://142.93.228.206:8006/ws/chat/${type}/?token=${token}`
}

export const createChatsSocket = (userType: UserType) => {
  const socket = createSocket()

  const onMessage = socket.events.onMessage.map((message: ChatMessage) => message)

  const send = createEvent<SocketChatMessage>()

  forward({
    from: send,
    to: socket.methods.send
  })

  const $needConnect = combine($isLoggedIn, $isClient, (l, c) => l && c)
  const connect = guard({
    source: $token,
    filter: $needConnect,
    target: socket.methods.connect
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
    }
  }
}

export const clientChatsSocket = createChatsSocket(`client`)
export const coachChatsSocket = createChatsSocket(`coach`)
