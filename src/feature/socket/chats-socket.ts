import { createSocket } from "@/feature/socket/create-socket"
import { ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { config } from "@/config"
import { createEvent, forward, sample } from "effector-root"
import { $token } from "@/lib/network/token"

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

  const connect = createEvent()

  sample({
    source: $token,
    clock: connect,
    fn: token => getChatSocketLink(userType, token),
    target: socket.methods.connect,
  })

  forward({
    from: send,
    to: socket.methods.send
  })

  return {
    methods: {
      ...socket.methods,
      connect,
    },
    events: {
      ...socket.events,
      onMessage,
    },
  }
}
