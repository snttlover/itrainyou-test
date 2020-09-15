import { createChatListModule } from "@/feature/chats-list/modules/chat-list"
import { getClientChats } from "@/lib/api/chats/clients/get-chats"
import { clientChatsSocket } from "@/feature/socket/chats-socket"
import { getClientChat } from "@/lib/api/chats/clients/get-chat"
import { clientCall } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"

export const clientChatsList = createChatListModule({
  fetchChatsListMethod: getClientChats,
  type: "client",
  socket: clientChatsSocket,
  getChat: getClientChat,
  sessionCallModule: clientCall
})
