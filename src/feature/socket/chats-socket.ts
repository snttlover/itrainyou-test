import { createSocket } from "@/feature/socket/create-socket"
import { PersonalChat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { config } from "@/config"
import { combine, createEvent, createStore, forward, guard, sample, merge, createEffect } from "effector-root"
import { $token, logout } from "@/lib/network/token"
import { $isLoggedIn, $userData } from "@/feature/user/user.model"
import { $isClient } from "@/lib/effector"
import { changePasswordFx } from "@/pages/common/settings/content/password-form.model"
import { registerUserFx } from "@/pages/auth/pages/signup/signup.model"

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

type MessagesReadDone = {
  type: `READ_MESSAGES_DONE`
  data: { messages: ChatMessage[] }
}

export type WriteChatMessageDone = {
  type: `WRITE_MESSAGE_DONE`
  data: ChatMessage
}

export type OnChatCreated = {
  type: `NEW_CHAT_CREATED`
  data: PersonalChat
}

type SocketMessageReceive = WriteChatMessageDone | InitMessage | MessagesReadDone | OnChatCreated

type UserType = "client" | "coach"

const getChatSocketLink = (type: UserType, token: string) => {
  return `${config.WS_HOST}/ws/chat/${type}/?token=${token}`
}

export const createChatsSocket = (userType: UserType) => {
  const socket = createSocket()

  const onMessage = createEvent<WriteChatMessageDone>()
  const onChatCreated = createEvent<OnChatCreated>()
  const onMessagesReadDone = createEvent<MessagesReadDone>()

  const send = socket.methods.send.prepend<SendSocketChatMessage>(data => ({ type: `WRITE_MESSAGE`, data }))
  const readMessages = socket.methods.send.prepend<ReadChatMessages>(data => ({ type: `READ_MESSAGES`, data }))

  const $needConnect = combine(
    $isLoggedIn,
    $isClient,
    $userData,
    (l, c, user) => l && c && !!user && (userType !== `coach` || !!user.coach?.isApproved)
  )

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

  const onIntercMessage = createEvent<WriteChatMessageDone>()

  $chatsCounters
    .on(onIntercMessage, (counters, message) => {
      const currentCounter = counters.find(counter => counter.id === message.data.chat)
      let counter = {
        id: message.data.chat,
        newMessagesCount: 1 + (!currentCounter ? 0 : currentCounter.newMessagesCount),
      }
      return [counter, ...counters.filter(c => c.id !== counter.id)]
    })
    .on(onMessagesReadDone, (counters, message) => {
      const chats = message.data.messages
        .filter(
          message =>
            (userType === `client` && !!message.senderCoach) ||
            (userType === `coach` && !!message.senderClient) ||
            message.type === `SYSTEM`
        )
        .map(message => message.chat)
      counters = counters.slice()

      chats.forEach(id => {
        const counter = counters.find(counter => counter.id === id)
        if (counter) {
          counter.newMessagesCount--
        }
      })

      return counters.filter(counter => counter.newMessagesCount > 0)
    })

  const $chatsCount = $chatsCounters.map($counters => $counters.length)

  guard({
    source: onMessage,
    filter: message =>
      (userType === `client` && !!message.data.senderCoach) ||
      (userType === `coach` && !!message.data.senderClient) ||
      message.data.type === `SYSTEM`,
    target: onIntercMessage,
  })

  guard({
    source: socket.events.onMessage,
    filter: (payload: SocketMessageReceive) => payload.type === `NEW_CHAT_CREATED`,
    target: onChatCreated,
  })

  guard({
    source: socket.events.onMessage,
    filter: (payload: SocketMessageReceive) => payload.type === `WRITE_MESSAGE_DONE`,
    target: onMessage,
  })

  guard({
    source: socket.events.onMessage,
    filter: (payload: SocketMessageReceive) => payload.type === `READ_MESSAGES_DONE`,
    target: onMessagesReadDone,
  })

  guard({
    source: socket.events.onMessage,
    filter: (payload: SocketMessageReceive) => payload.type === `INIT`,
    target: changeCountersFromInit,
  })

  sample({
    source: $token,
    clock: merge([$needConnect, registerUserFx.done]),
    fn: token => getChatSocketLink(userType, token),
    target: connect,
  })

  forward({
    from: changePasswordFx.done,
    to: socket.methods.disconnect,
  })

  forward({
    from: changePasswordFx.doneData.map(({ token }) => getChatSocketLink(userType, token)),
    to: connect,
  })

  forward({
    from: logout,
    to: socket.methods.disconnect,
  })

  return {
    data: {
      $chatsCount,
      $chatsCounters,
    },
    events: {
      ...socket.events,
      onMessage,
      onChatCreated,
    },
    methods: {
      send,
      readMessages,
    },
  }
}

export const clientChatsSocket = createChatsSocket(`client`)
export const coachChatsSocket = createChatsSocket(`coach`)
