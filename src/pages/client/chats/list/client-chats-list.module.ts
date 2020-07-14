import { createChatListModule } from "@/feature/chats-list/modules/chat-list"
import { getClientChats } from "@/lib/api/chats/clients/get-chats"
import { clientChatsSocket } from "@/feature/socket/chats-socket"
import { getClientChat } from "@/lib/api/chats/clients/get-chat"

export const clientChatsList = createChatListModule({
  fetchChatsListMethod: getClientChats,
  type: "client",
  socket: clientChatsSocket,
  getChat: getClientChat
})
