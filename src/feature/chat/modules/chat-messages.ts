import { createChatsSocket, WriteChatMessageDone } from "@/feature/socket/chats-socket"
import { createEffect, createEvent, createStore, guard, sample } from "effector-root"
import { createCursorPagination, CursorPaginationFetchMethod } from "@/feature/pagination/modules/cursor-pagination"
import {
  Chat,
  ChatMessage,
  ConflictStatus,
  MessageSessionRequestStatuses,
  SupportTicketType
} from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { CoachUser } from "@/lib/api/coach"
import { Client } from "@/lib/api/client/clientInfo"
import { ChatId } from "@/lib/api/chats/coach/get-messages"

type CreateChatMessagesModuleTypes = {
  type: "client" | "coach"
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
}

export type ChatSupportMessage = {
  type: "SUPPORT"
  id: number
  userName: string
  userAvatar: string | null
  ticketStatus: SupportTicketType
}

export type ChatSystemMessage = {
  type: "SYSTEM"
  id: number
  chatType: "coach" | "client"
  request: SessionRequest
  userName: string
  userAvatar: string | null
  status: ConflictStatus | MessageSessionRequestStatuses
  showButtons: boolean
}

export type ChatTextMessage = {
  type: "TEXT"
  id: number
  isMine: boolean
  text: string
  time: string
}

const onlyUniqueRequests = (value: number, index: number, self: number[]) => {
  return self.indexOf(value) === index
}

export type ChatMessagesTypes = ChatSystemMessage | ChatTextMessage | ChatSupportMessage

export const createChatMessagesModule = (config: CreateChatMessagesModuleTypes) => {
  const changeId = createEvent<ChatId>()
  let chatId: ChatId = 0
  const reset = createEvent()
  const $chatId = createStore<ChatId>(0)
    .on(changeId, (_, id) => id)
    .reset(reset)

  $chatId.watch(id => (chatId = id))

  const pagination = createCursorPagination({
    fetchMethod: params => config.fetchMessages(chatId, params),
  })

  const addMessage = createEvent<WriteChatMessageDone>()

  pagination.data.$list.on(addMessage, (messages, message) => [message.data, ...messages])

  const $messages = pagination.data.$list.map(messages => {
    const completedStatusesIds = messages
      .filter(message => message.sessionRequestStatus === `COMPLETED` && message.sessionRequest)
      .map(message => message.sessionRequest.id)

    const reqs = messages
      .filter(message => message.sessionRequest)
      .map(message => message.sessionRequest.id)
      .filter(onlyUniqueRequests)
      .map(id => messages.find(message => message.sessionRequest?.id === id)?.sessionRequest as SessionRequest)

    const getReq = (id: number) => reqs.find(req => req.id === id) as SessionRequest

    return messages
      .slice()
      .reverse()
      .map(
        (message): ChatMessagesTypes => {
          const isMine =
            (config.type === `client` && !!message.senderClient) || (config.type === `coach` && !!message.senderCoach)

          if ([`SYSTEM`, `SUPPORT`].includes(message.type)) {
            let user: CoachUser | Client | null = null

            if (config.type === `coach`) {
              user = message.sessionRequest?.initiatorClient || message.sessionRequest?.receiverClient || null
            } else {
              user =
                message.sessionRequest.session.coach ||
                message.sessionRequest.initiatorCoach ||
                message.sessionRequest.receiverCoach ||
                null
            }

            if (message.type === 'SUPPORT') {
              if (!user) {
                user = message.senderSupport
              }
              return {
                type: "SUPPORT",
                id: message.id,
                userName: `${user?.firstName} ${user?.lastName}`,
                userAvatar: user?.avatar || null,
                ticketStatus: message.systemTicketType
              }
            }

            return {
              type: message.type as "SYSTEM",
              id: message.id,
              chatType: config.type,
              request: getReq(message.sessionRequest.id),
              userName: `${user?.firstName} ${user?.lastName}`,
              userAvatar: user?.avatar || null,
              showButtons: !completedStatusesIds.includes(message.sessionRequest.id),
              status: message?.conflict?.status || message.sessionRequestStatus,
            }
          }

          return {
            type: `TEXT`,
            id: message.id,
            isMine,
            text: message.text,
            time: date(message.creationDatetime).format(`HH:mm`),
          }
        }
      )
  })

  const readMessage = config.socket.methods.readMessages.prepend<WriteChatMessageDone>(message => ({
    messages: [message.data.id],
  }))

  guard({
    source: config.socket.events.onMessage,
    filter: message => {
      return (
        (`SYSTEM` === message.data.type ||
          (config.type === `client` && !!message.data.senderCoach) ||
          (config.type === `coach` && !!message.data.senderClient)) &&
        chatId === message.data.chat
      )
    },
    target: readMessage,
  })

  guard({
    source: config.socket.events.onMessage,
    filter: message => message.data.chat === chatId,
    target: addMessage,
  })

  const $loading = pagination.data.$loading

  return {
    $chatId,
    pagination,
    $messages,
    changeId,
    reset,
    $loading,
  }
}
