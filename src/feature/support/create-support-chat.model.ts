import { Chat, ChatMessage, PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { CursorPagination, CursorPaginationRequest, Pagination } from "@/lib/api/interfaces/utils.interface"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { combine, createEffect, createEvent, createStore, forward, restore } from "effector-root"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { createChatMaterialsModule } from "@/feature/chat/modules/chat-materials/create-chat-materials"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"
import { ChatMaterials } from "@/lib/api/chats/clients/get-images"

export type SupportChatModelConfig = {
  type: "client" | "coach"
  fetchChat: (id: ChatId) => Promise<PersonalChat>
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
  fetchMaterials: (
    id: ChatId,
    materials: "images" | "documents",
    params: PaginationRequest
  ) => Promise<Pagination<ChatMaterials>>
}

export const createSupportChatModel = (config: SupportChatModelConfig) => {
  const reset = createEvent()
  const changeId = createEvent<ChatId>()

  const fetchSupportChatFx = createEffect({
    handler: config.fetchChat,
  })

  const $chatId = restore<ChatId>(changeId, 0).reset(reset)
  const changeChatInfo = createEvent<null | PersonalChat>()
  const $chatInfo = restore<PersonalChat | null>(changeChatInfo, null).reset(reset)

  const chatMessages = createChatMessagesModule({
    ...config,
    // @ts-ignore
    fetchMessages: (id: number, params: CursorPaginationRequest) => config.fetchMessages("support", params),
    isSupport: true,
    supportIsMe: true,
  })

  const materials = createChatMaterialsModule({
    $chatId,
    fetchMaterials: config.fetchMaterials,
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

  const mounted = createEvent<ChatId>()

  forward({
    from: mounted,
    to: [fetchSupportChatFx, chatMessages.pagination.methods.loadMore],
  })

  forward({
    from: fetchSupportChatFx.doneData.map(chat => chat.id),
    to: changeId,
  })

  forward({
    from: fetchSupportChatFx.doneData,
    to: changeChatInfo,
  })

  const $support = combine($chatInfo, chatMessages.pagination.data.$list, (chat, messages) => {
    let resolved = false

    // @ts-ignore
    const info = [...messages]
      .filter(message => !!message.systemTicketType)
      .reverse()
      // @ts-ignore
      .reduce((userInfo, message) => {
        if (message.systemTicketType) {
          if (message.systemTicketType === "SUPPORT_AGENT_FOUND") {
            resolved = false
            return {
              avatar: message.supportTicket?.support?.avatar,
              name: `${message.supportTicket?.support?.firstName} ${message.supportTicket?.support?.lastName}`,
            }
          } else {
            resolved = true
            return null
          }
        }
      }, null) as { name: string; avatar: string | null } | null

    if (resolved) {
      return null
    }

    if (chat?.support) {
      return {
        name: `${chat.support.firstName} ${chat.support.lastName}`,
        avatar: chat.support.avatar,
      }
    }

    return info
  })

  const $loading = combine(
    fetchSupportChatFx.pending,
    chatMessages.pagination.data.$loading,
    chatMessages.pagination.data.$list,
    $chatInfo,
    (chatLoading, messagesLoading, messages, chat) => {
      return chatLoading || (messagesLoading && !messages.length) || !chat
    }
  )

  const messageBox = createChatMessageBoxModule({
    ...config,
    $chatId,
  })

  return {
    materials,
    $support,
    chatMessages,
    socket: config.socket,
    messageBox,
    mounted,
    reset,
    $firstLoading: $loading,
  }
}
