import { createChatsSocket } from "@/feature/socket/chats-socket"
import { PersonalChat, ChatMessage } from "@/lib/api/chats/clients/get-chats"
import { createChatInfoModule } from "@/feature/chat/modules/chat-info"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { createEvent, createStore, forward, sample } from "effector-root"
import { CursorPagination, CursorPaginationRequest, Pagination } from "@/lib/api/interfaces/utils.interface"
import { ChatSession, GetChatSessionsQuery } from "@/lib/api/chats/clients/get-chat-sessions"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { createChatMaterialsModule } from "@/feature/chat/modules/chat-materials/create-chat-materials"
import { ChatMaterials } from "@/lib/api/chats/clients/get-images"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"
import { createChatDetailsModule } from "@/feature/chat/modules/chat-details"

export type ChatModuleConfig = {
  type: "client" | "coach"
  fetchChat: (id: ChatId) => Promise<PersonalChat>
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
  fetchMaterials: (
    id: ChatId,
    materials: "images" | "documents",
    params: PaginationRequest
  ) => Promise<Pagination<ChatMaterials>>
  fetchSessions: (params: GetChatSessionsQuery) => Promise<Pagination<ChatSession>>
}

export const createChatModule = (config: ChatModuleConfig) => {
  const reset = createEvent()
  const changeId = createEvent<ChatId>()
  const $chatId = createStore<ChatId>(0).on(changeId, (_, id) => id)
  const chat = createChatInfoModule(config)

  const materials = createChatMaterialsModule({
    $chatId,
    fetchMaterials: config.fetchMaterials,
  })

  const chatDetails = createChatDetailsModule({
    socket: config.socket,
    $chatId,
    fetchSessions: config.fetchSessions,
    chatUserType: config.type,
    chatInfoModule: chat,
    fetchMaterials: config.fetchMaterials,
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
      chatMessages.pagination.methods.loadMore,
      chat.loadChat,
      chatDetails.methods.init,
    ],
  })

  const messageBox = createChatMessageBoxModule({
    ...config,
    $chatId,
  })

  const mounted = createEvent<ChatId>()

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
    chatDetails,
    socket: config.socket,
    mounted,
    reset,
    messageBox,
  }
}
