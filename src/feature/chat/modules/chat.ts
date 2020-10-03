import { createChatsSocket } from "#/feature/socket/chats-socket"
import { PersonalChat, ChatMessage } from "#/lib/api/chats/clients/get-chats"
import { createChatInfoModule } from "#/feature/chat/modules/chat-info"
import { createChatMessagesModule } from "#/feature/chat/modules/chat-messages"
import { createEvent, createStore, forward, sample } from "effector-root"
import { CursorPagination, CursorPaginationRequest, Pagination } from "#/lib/api/interfaces/utils.interface"
import { createChatSessionsModule } from "#/feature/chat/modules/chat-sessions"
import { ChatSession, GetChatSessionsQuery } from "#/lib/api/chats/clients/get-chat-sessions"
import { ChatId } from "#/lib/api/chats/coach/get-messages"
import { createChatMessageBoxModule } from "#/feature/chat/view/content/message-box/create-message-box.module"
import { createChatMaterialsModule } from "#/feature/chat/modules/chat-materials/create-chat-materials"
import { ChatImage } from "#/lib/api/chats/clients/get-images"
import { PaginationRequest } from "#/feature/pagination/modules/pagination"

export type ChatModuleConfig = {
  type: "client" | "coach"
  fetchChat: (id: ChatId) => Promise<PersonalChat>
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>,
  fetchMaterials: (id: ChatId, params: PaginationRequest) => Promise<Pagination<ChatImage>>,
  fetchSessions: (params: GetChatSessionsQuery) => Promise<Pagination<ChatSession>>
}

export const createChatModule = (config: ChatModuleConfig) => {
  const reset = createEvent()
  const changeId = createEvent<ChatId>()
  const $chatId = createStore<ChatId>(0).on(changeId, (_, id) => id)
  const chat = createChatInfoModule(config)

  const materials = createChatMaterialsModule({
    $chatId,
    fetchMaterials: config.fetchMaterials
  })

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

  const messageBox = createChatMessageBoxModule({
    ...config,
    $chatId
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
    materials,
    chat,
    chatMessages,
    chatSessions,
    socket: config.socket,
    mounted,
    reset,
    messageBox
  }
}
