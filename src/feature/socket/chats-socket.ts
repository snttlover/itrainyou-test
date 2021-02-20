import { createSocket } from "@/feature/socket/create-socket"
import { ChatMessage, PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { config } from "@/config"
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  merge,
  restore,
  sample,
  split
} from "effector-root"
import { $token, logout } from "@/lib/network/token"
import { $isFullRegistered, $isLoggedIn, $userData } from "@/feature/user/user.model"
import { $isClient } from "@/lib/effector"
import { changePasswordFx } from "@/pages/common/settings/content/password-form.model"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { condition, debounce } from "patronum"
import { runInScope } from "@/scope"
import { registerUserFx } from "@/pages/auth/pages/signup/models/units"


type SendSocketChatMessage = {
  chat: number
  text?: string
  image?: string
}

type ReadChatMessages = {
  messages: number[]
}

type ChatCounter = {
  id: number
  newMessagesCount: number
  type?: "SUPPORT" | "PERSONAL" | "SYSTEM"
}

type InitMessage = {
  type: "INIT"
  data: { unreadChats: ChatCounter[]; newNotificationsCount: number; activeSessions: DashboardSession }
}

type MessagesReadDone = {
  type: "READ_MESSAGES_DONE"
  data: { messages: ChatMessage[] }
}

export type NewNotification = {
  type: "NEW_NOTIFICATION"
  data: Notification
}

export type ReadNotificationsDone = {
  type: "READ_NOTIFICATIONS_DONE"
  data: number[]
}

export type WriteChatMessageDone = {
  type: "WRITE_MESSAGE_DONE"
  data: ChatMessage
}

type PongMessage = {
  type: "PONG"
}

export type SessionStarted = {
  type: "SESSION_STARTED"
  data: DashboardSession
}

export type OnChatCreated = {
  type: "NEW_CHAT_CREATED"
  data: PersonalChat
}

type SocketMessageReceive =
  | WriteChatMessageDone
  | InitMessage
  | MessagesReadDone
  | OnChatCreated
  | NewNotification
  | ReadNotificationsDone
  | SessionStarted

type UserType = "client" | "coach" | "admin" | "support"

const getChatSocketLink = (type: UserType, token: string, query?: any) => {
  return `${config.WS_HOST}/ws/chat/${type}/?${new URLSearchParams({ token, ...query }).toString()}`
}

export const createChatsSocket = (userType: UserType, query?: any) => {
  const socket = createSocket()

  const onMessage = createEvent<WriteChatMessageDone>()
  const onNotification = createEvent<NewNotification>()
  const onReadNotification = createEvent<ReadNotificationsDone>()
  const onChatCreated = createEvent<OnChatCreated>()
  const onMessagesReadDone = createEvent<MessagesReadDone>()
  const onSessionStarted = createEvent<SessionStarted>()

  const send = socket.methods.send.prepend<SendSocketChatMessage>(data => ({ type: "WRITE_MESSAGE", data }))
  const readMessages = socket.methods.send.prepend<ReadChatMessages>(data => ({ type: "READ_MESSAGES", data }))

  const $needConnect = combine(
    $isLoggedIn,
    $isClient,
    $userData,
    $isFullRegistered,
    (l, c, user, full) => (l && c && !!user && (userType !== "coach" || !!user.coach) && full) || userType === "support"
  )

  const reportUnknownTypeFx = createEffect({
    handler: (response: any) => console.log("reportUnknownType", response),
  })

  /*const $needConnect = combine(
    $isLoggedIn,
    $userData,
    $isFullRegistered,
    (l,user) => l && !!user && (userType !== "coach" || !!user.coach)
  )*/

  const connect = guard({
    source: $token,
    filter: $needConnect,
    target: socket.methods.connect.prepend((data: string)=>{
      if(userType === "support") {
        return getChatSocketLink(userType, data, query)
      }
      else {
        return data
      }
    }),
  })

  /*const connect = guard({
    source: $token,
    filter: $needConnect,
    target: socket.methods.connect,
  })*/

  const changeCountersFromInit = createEvent<InitMessage>()

  const $chatsCounters = createStore<ChatCounter[]>([]).on(
    changeCountersFromInit,
    (_, message) => message.data.unreadChats.filter(chat => chat.type !== "SUPPORT")
  )

  const onSupportMessage = createEvent<WriteChatMessageDone>()

  const $supportUnreadMessagesCounter = createStore<number>(0).on(
    changeCountersFromInit,
    (_, message) => message.data.unreadChats.filter(chat => chat.type === "SUPPORT")[0]?.newMessagesCount)
    .on(onSupportMessage, (counters, message) => counters + 1)
    .reset(onMessagesReadDone)

  const changeNotificationsCounter = createEvent<number>()
  const $notificationsCounter = restore(changeNotificationsCounter, 0)
    .on(onNotification, count => count + 1)
    .on(onReadNotification, (count, message) => count - message.data.length)

  forward({
    from: changeCountersFromInit.map(res => res.data.newNotificationsCount),
    to: changeNotificationsCounter,
  })


  const onIntercMessage = createEvent<WriteChatMessageDone>()

  $chatsCounters
    .on(onIntercMessage, (counters, message) => {
      const currentCounter = counters.find(counter => counter.id === message.data.chat)
      const counter = {
        id: message.data.chat,
        newMessagesCount: 1 + (!currentCounter ? 0 : currentCounter.newMessagesCount),
      }
      return [counter, ...counters.filter(c => c.id !== counter.id)]
    })
    .on(onMessagesReadDone, (counters, message) => {
      const chats = message.data.messages
        .filter(
          message =>
            (userType === "client" && !!message.senderCoach) ||
            (userType === "coach" && !!message.senderClient) ||
            message.type === "SYSTEM"
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

  sample({
    source: guard({ source: $token, filter: token => !!token }),
    clock: merge([$needConnect, registerUserFx.done]),
    fn: token => getChatSocketLink(userType, token, query),
    target: connect,
  })

  forward({
    from: [changePasswordFx.done, logout],
    to: socket.methods.disconnect,
  })

  forward({
    from: changePasswordFx.doneData.map(({ token }) => getChatSocketLink(userType, token)),
    to: connect,
  })

  const ping = socket.methods.send.prepend(() => ({ type: "PING" }))

  let pingPongInterval: any = null

  const pingPongFx = createEffect({
    handler: () => {
      if (pingPongInterval) {
        clearInterval(pingPongInterval)
        pingPongInterval = null
      }
      pingPongInterval = setInterval(() => runInScope(ping), 5000)
    },
  })

  forward({
    from: socket.events.onConnect.map(() => {}),
    to: pingPongFx,
  })

  const changePonged = createEvent<boolean>()
  const $wasPonged = restore(changePonged, true)

  split({
    source: socket.events.onMessage,
    match: {
      onChatCreated: (payload: SocketMessageReceive) => payload.type === "NEW_CHAT_CREATED",
      onNotification: (payload: SocketMessageReceive) => payload.type === "NEW_NOTIFICATION",
      onReadNotification: (payload: SocketMessageReceive) => payload.type === "READ_NOTIFICATIONS_DONE",
      onMessage: (payload: SocketMessageReceive) => payload.type === "WRITE_MESSAGE_DONE",
      onMessagesReadDone: (payload: SocketMessageReceive) => payload.type === "READ_MESSAGES_DONE",
      changeCountersFromInit: (payload: SocketMessageReceive) => payload.type === "INIT",
      onSessionStarted: (payload: SocketMessageReceive) => payload.type === "SESSION_STARTED",
      onPong: (payload: PongMessage) => payload.type === "PONG",
    },
    cases: {
      onChatCreated: onChatCreated,
      onNotification: onNotification,
      onReadNotification: onReadNotification,
      onMessage: onMessage,
      onMessagesReadDone: onMessagesReadDone,
      changeCountersFromInit: changeCountersFromInit,
      onSessionStarted: onSessionStarted,
      onPong: changePonged.prepend(() => true),
      __: reportUnknownTypeFx,
    },
  })

  split({
    source: onMessage,
    match: {
      onIntercMessage: message =>
        (userType === "client" && !!message.data.senderCoach) ||
        (userType === "coach" && !!message.data.senderClient) ||
        message.data.type === "SYSTEM",
      onSupportMessage: message => !!message.data.senderSupport,
    },
    cases: {
      onIntercMessage: onIntercMessage,
      onSupportMessage: onSupportMessage,
    },
  })

  condition({
    source: ping,
    if: $wasPonged.map(ponged => !ponged),
    then: socket.methods.reconnect,
    else: changePonged.prepend(() => false),
  })

  forward({
    from: socket.methods.reconnect,
    to: changePonged.prepend(() => true),
  })

  forward({
    from: socket.events.onConnect,
    to: changePonged.prepend(() => true),
  })

  return {
    data: {
      $chatsCount,
      $chatsCounters,
      $notificationsCounter,
      $supportUnreadMessagesCounter
    },
    events: {
      ...socket.events,
      onMessage,
      onMessagesReadDone,
      onChatCreated,
      onSessionStarted,
    },
    methods: {
      send,
      readMessages,
    },
  }
}

export const clientChatsSocket = createChatsSocket("client")
export const coachChatsSocket = createChatsSocket("coach")