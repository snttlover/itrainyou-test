import { createChatsSocket } from "@/feature/socket/chats-socket"
import { Chat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { createChatInfoModule } from "@/feature/chat/modules/chat-info"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { createEvent, createStore, forward, sample } from "effector-root"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"

export type ChatListModuleConfig = {
  type: "client" | "coach"
  fetchChat: (id: number) => Promise<Chat>
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: number, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
}

export const createChatModule = (config: ChatListModuleConfig) => {
  const reset = createEvent()
  const changeId = createEvent<number>()
  const $chatId = createStore<number>(0).on(changeId, (_, id) => id)
  const chat = createChatInfoModule(config)

  const chatMessages = createChatMessagesModule(config)

  forward({
    from: changeId,
    to: [chatMessages.changeId, chat.changeId],
  })

  const load = createEvent()

  forward({
    from: [reset],
    to: [chat.reset, chatMessages.reset, chatMessages.pagination.methods.reset]
  })

  forward({
    from: load,
    to: [chat.reset, chatMessages.pagination.methods.reset, chatMessages.pagination.methods.loadMore, chat.loadChat],
  })

  const send = createEvent<string>()

  sample({
    source: $chatId,
    clock: send,
    fn: (chatId, message) => ({ chat: chatId, text: message }),
    target: config.socket.methods.send
  })

  const mounted = createEvent<number>()

  forward({
    from: mounted,
    to: changeId
  })

  forward({
    from: changeId,
    to: load
  })

  return {
    chat,
    chatMessages,
    socket: config.socket,
    send,
    mounted,
    reset
  }
}
