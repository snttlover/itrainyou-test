import { Chat } from "@/lib/api/chats/clients/get-chats"
import { PaginationFetchMethod } from "@/feature/pagination/modules/pagination"
import { createChatsSocket } from "@/feature/socket/chats-socket"

export type ChatListModuleConfig = {
  fetchChatInfo: PaginationFetchMethod<Chat>
  fetchMessages: PaginationFetchMethod<Chat>
  socket: ReturnType<typeof createChatsSocket>
}

export const createChatModule = (config: ChatListModuleConfig) => {


  return {

  }
}
