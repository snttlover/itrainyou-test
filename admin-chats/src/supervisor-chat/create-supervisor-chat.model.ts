import { ChatMessage, PersonalChat } from "@/lib/api/chats/clients/get-chats"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"
import { createChatMessagesModule } from "@/feature/chat/modules/chat-messages"
import { combine, createEffect, createEvent, forward, restore } from "effector"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { createChatMessageBoxModule } from "@/feature/chat/view/content/message-box/create-message-box.module"

export type SupervisorChatModelConfig = {
  type: "client" | "coach"
  fetchChat: (id: ChatId) => Promise<PersonalChat>
  socket: ReturnType<typeof createChatsSocket>
  fetchMessages: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatMessage>>
}

export const createSupervisorChatModel = (config: SupervisorChatModelConfig) => {
  const reset = createEvent()
  const changeId = createEvent<ChatId>()

  const fetchSupervisorChatFx = createEffect({
    handler: config.fetchChat,
  })

  const $chatId = restore<ChatId>(changeId, 0).reset(reset)
  const changeChatInfo = createEvent<null | PersonalChat>()
  const $chatInfo = restore<PersonalChat | null>(changeChatInfo, null).reset(reset)

  const chatMessages = createChatMessagesModule({
    ...config,
    fetchMessages: config.fetchMessages,
    dontRead: true
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

  const messageBox = createChatMessageBoxModule({
    ...config,
    $chatId,
  })

  return {
    chatMessages,
    socket: config.socket,
    messageBox,
    mounted,
    reset,
    $firstLoading
  }
}
