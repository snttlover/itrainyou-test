import { createEvent, createStore, forward, Store } from "effector-root"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { ChatSession, GetChatSessionsQuery } from "@/lib/api/chats/clients/get-chat-sessions"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { createChatSessionsModule } from "@/feature/chat/modules/chat-sessions"
import { createChatInfoModule } from "@/feature/chat/modules/chat-info"
import { createChatImagesListModule } from "@/feature/chat/modules/chat-images"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"
import { ChatMaterials } from "@/lib/api/chats/clients/get-images"

type CreateChatDetailsModuleConfig = {
  socket: ReturnType<typeof createChatsSocket>
  $chatId: Store<ChatId>
  chatUserType: "client" | "coach"
  chatInfoModule: ReturnType<typeof createChatInfoModule>
  fetchSessions: (params: GetChatSessionsQuery) => Promise<Pagination<ChatSession>>
  fetchMaterials: (
    id: ChatId,
    materials: "images" | "documents",
    params: PaginationRequest
  ) => Promise<Pagination<ChatMaterials>>
}

type ChatDetailsTab = "sessions" | "photos" | "documents"

export const createChatDetailsModule = (config: CreateChatDetailsModuleConfig) => {
  const reset = createEvent()
  const init = createEvent()

  const changeTab = createEvent<ChatDetailsTab>()
  const $tab = createStore<ChatDetailsTab>("sessions")
    .on(changeTab, (_, tab) => tab)
    .reset(reset)

  const sessions = createChatSessionsModule({
    socket: config.socket,
    $chatId: config.$chatId,
    chatUserType: config.chatUserType,
    fetch: config.fetchSessions,
    $withAvatars: createStore<boolean>(false),
  })

  const photos = createChatImagesListModule(config)

  forward({
    from: reset,
    to: [sessions.methods.reset, photos.methods.reset],
  })

  return {
    data: {
      $tab,
    },
    methods: {
      changeTab,
      reset,
      init,
    },
    modules: {
      photos,
      sessions,
      info: config.chatInfoModule,
    },
  }
}
