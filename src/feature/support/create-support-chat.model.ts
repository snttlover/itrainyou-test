import { Chat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { combine, createEffect, createEvent, forward, restore, sample } from "effector-root"
import { ChatId } from "@/lib/api/chats/coach/get-messages"

export type SupportChatModelConfig = {
  type: "client" | "coach"
  socket: ReturnType<typeof createChatsSocket>
  fetchChat: () => Promise<Chat>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
}

export const createSupportChatModel = (config: SupportChatModelConfig) => {
  const reset = createEvent()
  const changeId = createEvent<ChatId>()

  const fetchSupportChatFx = createEffect({
    handler: config.fetchChat,
  })

  const $chatId = restore<ChatId>(changeId, 0).reset(reset)

  const chatMessages = createChatMessagesModule({
    ...config,
    // @ts-ignore
    fetchMessages: (id: number, params: CursorPaginationRequest) => config.fetchMessages("support", params),
  })

  const load = createEvent()

  forward({
    from: [reset],
    to: [chatMessages.reset, chatMessages.pagination.methods.reset],
  })

  forward({
    from: load,
    to: [chatMessages.pagination.methods.reset, chatMessages.pagination.methods.loadMore],
  })

  forward({
    from: changeId,
    to: chatMessages.changeId,
  })

  const send = createEvent<string>()

  sample({
    // @ts-ignore
    source: $chatId,
    clock: send,
    // @ts-ignore
    fn: (chatId, message) => ({ chat: chatId, text: message }),
    target: config.socket.methods.send,
  })

  const mounted = createEvent<ChatId>()

  forward({
    from: mounted,
    to: [fetchSupportChatFx, chatMessages.pagination.methods.loadMore],
  })

  forward({
    from: fetchSupportChatFx.doneData.map(chat => chat.id),
    to: [changeId],
  })

  const $loading = fetchSupportChatFx.pending

  const $support = chatMessages.pagination.data.$list.map(messages => {
    // @ts-ignore
    return messages.reduce((userInfo, message) => {
      if (message.systemTicketType) {
        if (message.systemTicketType === "SUPPORT_AGENT_FOUND") {
          return {
            name: `${message.senderSupport?.firstName} ${message.senderSupport?.lastName}`,
          }
        } else {
          return null
        }
      }
    }, null) as { name: string } | null
  })

  return {
    $support,
    chatMessages,
    socket: config.socket,
    send,
    mounted,
    reset,
    $firstLoading: $loading,
  }
}