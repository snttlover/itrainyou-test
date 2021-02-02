import { createChatsSocket, WriteChatMessageDone } from "@/feature/socket/chats-socket"
import { createEvent, createStore, guard } from "effector-root"
import { createCursorPagination } from "@/feature/pagination/modules/cursor-pagination"
import {
  ChatMessage,
  ConflictStatus,
  MessageSessionRequestStatuses,
  SupportTicketType,
  TransActionProperties,
  TransActionsStatus
} from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { CoachUser } from "@/lib/api/coach"
import { Client } from "@/lib/api/client/clientInfo"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { debounce } from "patronum"

type CreateChatMessagesModuleTypes = {
  type: "client" | "coach"
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>,
  dontRead?: boolean

  isSupport?: true,
  supportIsMe?: true
}


export type ChatSupportMessage = {
  type: "SUPPORT"
  id: number
  userName: string
  userAvatar: string | null
  ticketStatus: SupportTicketType
  isReadByYou: boolean
}

export type ChatSystemMessage = {
  type: "SYSTEM"
  id: number
  chatType: "coach" | "client"
  request: SessionRequest | TransActionProperties
  userName: string
  userAvatar: string | null
  status: ConflictStatus | MessageSessionRequestStatuses | TransActionsStatus
  showButtons: boolean
  date: string
  isReadByYou: boolean
}

export type PersonalChatMessage = {
  type: "TEXT"
  id: number
  isMine: boolean
  text: string
  image: string
  time: string
  user: CoachUser | Client | null
  imageIndex: number
  isReadByYou: boolean
}

const onlyUniqueRequests = (value: number, index: number, self: number[]) => {
  return self.indexOf(value) === index
}

export type ChatMessagesTypes = ChatSystemMessage | PersonalChatMessage | ChatSupportMessage

export const createChatMessagesModule = (config: CreateChatMessagesModuleTypes) => {
  const changeId = createEvent<ChatId>()
  const updateMessages = createEvent<ChatMessage[]>()
  const reset = createEvent()
  let chatId: ChatId = 0
  let chatLoaded = false
  const $readedMessages = createStore<ChatMessage[]>([])
    .on(config.socket.events.onMessagesReadDone, (state, data) => {
      const newState = data.data.messages

      return state.concat(newState)
    }).reset(changeId)

  const $chatId = createStore<ChatId>(0)
    .on(changeId, (_, id) => id)
    .reset(reset)

  $chatId.watch(id => (chatId = id))

  const pagination = createCursorPagination({
    fetchMethod: params => config.fetchMessages(chatId, params),
  })

  const $loading = pagination.data.$loading

  const $chatLoaded = createStore<boolean>(false)
    .on($loading, (state, loading) => state ? true : !loading)
    .reset([reset, changeId])

  $chatLoaded.watch(loaded => (chatLoaded = loaded))

  const addMessage = createEvent<WriteChatMessageDone>()

  pagination.data.$list.on(addMessage, (messages, message) => {
    const arrayOfids = messages.map(message => message.id)
    if (arrayOfids.includes(message.data.id)) return messages
    return [message.data, ...messages]
  })
    .on(updateMessages,(messages,updateMessages) => {
      const arrayOfids = updateMessages.map(upd => upd.id)
      return messages.map(message => {
        let isTrue = false
        arrayOfids.map(id => {
          if (id === message.id) isTrue = true
        })
        if (isTrue) {
          message["isReadByYou"] = true
          return message
        } else {
          return message
        }
      })
    })

  const $messages = pagination.data.$list.map(messages => {
    const completedStatusesIds = messages
      .filter(message => message.sessionRequestStatus === "COMPLETED" && message.sessionRequest)
      .map(message => message.sessionRequest?.id)


    const reqs = messages
      .filter(message => message.sessionRequest)
      .map(message => message.sessionRequest!.id)
      .filter(onlyUniqueRequests)
      .map(id => messages.find(message => message.sessionRequest?.id === id)?.sessionRequest as SessionRequest)

    const transactions = messages
      .filter(message => message.transaction)
      .map(message => message.transaction!.id)
      .filter(onlyUniqueRequests)
      .map(id => messages.find(message => message.transaction?.id === id)?.transaction as TransActionProperties)

    const getReq = (id: number) => reqs.find(req => req.id === id) as SessionRequest
    const getTrans = (id: number) => transactions.find(trans => trans.id === id) as TransActionProperties
    let imageIndex = messages.filter(message => !!message.image).length - 1

    return messages
      .slice()
      .reverse()
      .map(
        (message): ChatMessagesTypes => {
          let isMine =
            (config.type === "client" && !!message.senderClient) || (config.type === "coach" && !!message.senderCoach)

          if (config.supportIsMe) {
            isMine = !message.senderSupport
          }

          let user: CoachUser | Client | null = null

          if (message.type === "SUPPORT") {
            const user = message?.supportTicket?.support
            return {
              type: "SUPPORT",
              id: message.id,
              userName: `${user?.firstName} ${user?.lastName}`,
              userAvatar: user?.avatar || null,
              ticketStatus: message.systemTicketType,
              isReadByYou: message.isReadByYou,
            }
          }

          if (["SYSTEM", "SUPPORT"].includes(message.type)) {
            if (config.type === "coach") {
              user = message.sessionRequest?.initiatorClient || message.sessionRequest?.receiverClient || null
            } else {
              user =
                      message.sessionRequest?.session.coach ||
                      message.sessionRequest?.initiatorCoach ||
                      message.sessionRequest?.receiverCoach ||
                      null
            }
            if (!message.sessionRequest) {
              user = message.transaction?.session.coach || null
              return {
                type: message.type as "SYSTEM",
                id: message.id,
                chatType: config.type,
                request: getTrans(message.transaction!.id),
                userName: `${user?.firstName} ${user?.lastName}`,
                userAvatar: user?.avatar || null,
                showButtons: false,
                status: message.transactionType,
                date: message.creationDatetime,
                isReadByYou: message.isReadByYou,
              }
            }
            else {
              return {
                type: message.type as "SYSTEM",
                id: message.id,
                chatType: config.type,
                request: getReq(message.sessionRequest.id),
                userName: `${user?.firstName} ${user?.lastName}`,
                userAvatar: user?.avatar || null,
                showButtons: !completedStatusesIds.includes(message.sessionRequest.id),
                status: message?.conflict?.status || message.sessionRequestStatus,
                date: message.creationDatetime,
                isReadByYou: message.isReadByYou,
              }
            }
          }

          user = message.senderCoach || message.senderClient || message.senderSupport

          return {
            type: "TEXT",
            id: message.id,
            isMine,
            isReadByYou: message.isReadByYou,
            text: message.text,
            image: message.image,
            time: date(message.creationDatetime).format("HH:mm"),
            imageIndex: message.image ? imageIndex-- : imageIndex,
            user
          }
        }
      )
  })

  const readMessage = config.socket.methods.readMessages.prepend<WriteChatMessageDone>(message => ({
    messages: [message.data.id],
  }))

  debounce({
    source: $readedMessages,
    timeout: 500,
    target: updateMessages,
  })

  if (!config.dontRead) {
    guard({
      source: config.socket.events.onMessage,
      filter: message => {
        return (
          ("SYSTEM" === message.data.type ||
            (config.type === "client" && !!message.data.senderCoach) ||
            (config.type === "coach" && !!message.data.senderClient)) &&
          chatId === message.data.chat
        )
      },
      target: readMessage,
    })
  }

  guard({
    source: config.socket.events.onMessage,
    filter: message => (message.data.chat === chatId && chatLoaded) || !!config.isSupport,
    target: addMessage,
  })
  
  
  return {
    $chatId,
    pagination,
    $messages,
    changeId,
    reset,
    $loading,
  }
}
