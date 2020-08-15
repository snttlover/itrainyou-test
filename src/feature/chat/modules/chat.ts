import { createChatsSocket } from "@/feature/socket/chats-socket"
import { PersonalChat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { createChatInfoModule } from "@/feature/chat/modules/chat-info"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { createEvent, createStore, forward, sample } from "effector-root"
import { CursorPagination, CursorPaginationRequest, Pagination } from "@/lib/api/interfaces/utils.interface"
import { createChatSessionsModule } from "@/feature/chat/modules/chat-sessions"
import { ChatSession, GetChatSessionsQuery } from "@/lib/api/chats/clients/get-chat-sessions"

export type ChatListModuleConfig = {
  type: "client" | "coach"
  fetchChat: (id: number) => Promise<PersonalChat>
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: number, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>,
  fetchSessions: (params: GetChatSessionsQuery) => Promise<Pagination<ChatSession>>
}

export const createChatModule = (config: ChatListModuleConfig) => {
  const reset = createEvent()
  const changeId = createEvent<number>()
  const $chatId = createStore<number>(0).on(changeId, (_, id) => id)
  const chat = createChatInfoModule(config)

  const chatSessions = createChatSessionsModule({
    socket: config.socket,
    $withAvatars: chat.$chat.map(chat => chat.chatType === `SYSTEM`),
    $chatId,
    fetch: config.fetchSessions,
    chatUserType: config.type
  })

  const chatMessages = createChatMessagesModule(config)

  forward({
    from: changeId,
    to: [chatMessages.changeId, chat.changeId],
  })

  const load = createEvent()

  forward({
    from: [reset],
    to: [chat.reset, chatMessages.reset, chatMessages.pagination.methods.reset],
  })

  forward({
    from: load,
    to: [
      chat.reset,
      chatMessages.pagination.methods.reset,
      chatSessions.methods.reset,
      chatMessages.pagination.methods.loadMore,
      chat.loadChat,
      chatSessions.methods.loadSessions
    ],
  })

  const send = createEvent<string>()

  sample({
    source: $chatId,
    clock: send,
    fn: (chatId, message) => ({ chat: chatId, text: message }),
    target: config.socket.methods.send,
  })

  const mounted = createEvent<number>()

  forward({
    from: mounted,
    to: changeId,
  })

  forward({
    from: changeId,
    to: load,
  })

  return {
    chat,
    chatMessages,
    chatSessions,
    socket: config.socket,
    send,
    mounted,
    reset,
  }
}
