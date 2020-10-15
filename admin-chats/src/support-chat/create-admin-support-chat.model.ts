import { ChatMessage, PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { CursorPagination, CursorPaginationRequest, Pagination } from "@/lib/api/interfaces/utils.interface"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { combine, createEffect, createEvent, forward, restore } from "effector-root"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"
import { ChatImage } from "@/lib/api/chats/clients/get-images"
import { createChatMaterialsModule } from "@/feature/chat/modules/chat-materials/create-chat-materials"

export type SupportChatModelConfig = {
  type: "client" | "coach"
  fetchChat: (id: ChatId) => Promise<PersonalChat>
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
  fetchMaterials: (id: ChatId, params: PaginationRequest) => Promise<Pagination<ChatImage>>,
}

export const createAdminSupportChatModel = (config: SupportChatModelConfig) => {
  const reset = createEvent()
  const changeId = createEvent<ChatId>()

  const changeDialogVisibility = createEvent<boolean>()
  const $showDialog = restore(changeDialogVisibility, true)

  const fetchSupervisorChatFx = createEffect({
    handler: config.fetchChat,
  })

  const $chatId = restore<ChatId>(changeId, 0).reset(reset)
  const changeChatInfo = createEvent<null | PersonalChat>()
  const $chatInfo = restore<PersonalChat | null>(changeChatInfo, null).reset(reset)

  const chatMessages = createChatMessagesModule({
    ...config,
    fetchMessages: config.fetchMessages,
    dontRead: true,
    isSupport: true,
    supportIsMe: true
  })

  const load = createEvent()

  const materials = createChatMaterialsModule({
    $chatId,
    fetchMaterials: config.fetchMaterials
  })

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
    to: [fetchSupervisorChatFx],
  })

  forward({
    from: fetchSupervisorChatFx.doneData.map(chat => chat.id),
    to: changeId,
  })

  forward({
    from: changeId,
    to: chatMessages.pagination.methods.loadMore
  })

  forward({
    from: fetchSupervisorChatFx.doneData,
    to: changeChatInfo,
  })

  const $firstLoading = combine(
    fetchSupervisorChatFx.pending,
    chatMessages.pagination.data.$loading,
    chatMessages.pagination.data.$list,
    (chatLoading, messagesLoading, messages) => {
      return chatLoading || (messagesLoading && !messages.length)
    }
  )

  const $chatHeader = $chatInfo.map((chat) => {
    const user = chat?.coach || chat?.clients?.[0]
    return {
      name: `${user?.firstName} ${user?.lastName}`,
      avatar: user?.avatar || null
    }
  })

  const messageBox = createChatMessageBoxModule({
    ...config,
    $chatId,
  })

  return {
    materials,
    $showDialog,
    chatMessages,
    socket: config.socket,
    messageBox,
    mounted,
    reset,
    $firstLoading,
    changeDialogVisibility,
    $chatHeader
  }
}
