import { createChatsSocket, WriteChatMessageDone } from "@/feature/socket/chats-socket"
import { createEffect, createEvent, createStore, guard } from "effector-root"
import { createCursorPagination, CursorPaginationFetchMethod } from "@/feature/pagination/modules/cursor-pagination"
import { ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { date } from "@/lib/formatting/date"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"

type CreateChatMessagesModuleTypes = {
  type: "client" | "coach"
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: number, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
}

export const createChatMessagesModule = (config: CreateChatMessagesModuleTypes) => {
  const changeId = createEvent<number>()
  let chatId = 0
  const $chatId = createStore(0).on(changeId, (_, id) => id)

  $chatId.watch(id => (chatId = id))

  const pagination = createCursorPagination({
    fetchMethod: params => config.fetchMessages(chatId, params),
  })

  const addMessage = createEvent<WriteChatMessageDone>()

  pagination.data.$list.on(addMessage, (messages, message) => [message.data, ...messages])

  const $messages = pagination.data.$list.map(messages => {
    return messages
      .slice()
      .reverse()
      .map(message => {
        const isMine =
          (config.type === `client` && !!message.senderClient) || (config.type === `coach` && !!message.senderCoach)

        return {
          id: message.id,
          isMine,
          text: message.text,
          time: date(message.creationDatetime).format(`HH:mm`),
        }
      })
  })

  guard({
    source: config.socket.events.onMessage,
    filter: message => message.data.chat === chatId,
    target: addMessage,
  })

  return {
    $chatId,
    pagination,
    $messages,
    changeId,
  }
}
